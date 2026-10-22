import { Router } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Attendee from '../models/Attendee.js';
import Event from '../models/Event.js';
import Ticket from '../models/Ticket.js';
import authGuard from '../middleware/authGuard.js';

const router = Router();

router.post('/auth/login', async (req, res, next) => {
  try {
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    if (!email) return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Email is required.' } });

    const attendee = await Attendee.findOne({ email });
    if (!attendee) return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'No attendee account was found for that email.' } });

    const token = jwt.sign(
      { role: attendee.role },
      process.env.JWT_SECRET,
      { subject: attendee.id, expiresIn: '2h' },
    );
    return res.status(200).json({
      token,
      attendee: { id: attendee.id, name: attendee.name, email: attendee.email, role: attendee.role },
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/events', async (req, res, next) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    return res.status(200).json({ events });
  } catch (error) {
    return next(error);
  }
});

router.post('/tickets', authGuard, async (req, res, next) => {
  try {
    const eventId = req.body?.eventId;
    const quantity = Number(req.body?.quantity);
    if (!mongoose.isValidObjectId(eventId) || !Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Provide a valid eventId and a positive whole-number quantity.' } });
    }

    const event = await Event.findOneAndUpdate(
      { _id: eventId, ticketsAvailable: { $gte: quantity } },
      { $inc: { ticketsAvailable: -quantity } },
      { new: true, runValidators: true },
    );
    if (!event) {
      return res.status(400).json({ error: { code: 'INSUFFICIENT_TICKETS', message: 'The event does not exist or has insufficient tickets available.' } });
    }

    try {
      const ticket = await Ticket.create({ attendeeId: req.auth.attendeeId, eventId, quantity });
      return res.status(201).json({ ticket, ticketsRemaining: event.ticketsAvailable });
    } catch (error) {
      await Event.updateOne({ _id: eventId }, { $inc: { ticketsAvailable: quantity } });
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

router.get('/tickets/my', authGuard, async (req, res, next) => {
  try {
    const tickets = await Ticket.find({ attendeeId: req.auth.attendeeId })
      .populate('eventId', 'title category date venue')
      .sort({ bookingDate: -1 });
    return res.status(200).json({ tickets });
  } catch (error) {
    return next(error);
  }
});

router.patch('/tickets/:id/status', authGuard, async (req, res, next) => {
  try {
    const status = req.body?.status;
    if (!mongoose.isValidObjectId(req.params.id) || !['booked', 'cancelled', 'used'].includes(status)) {
      return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Provide a valid ticket id and status (booked, cancelled, or used).' } });
    }

    const ticket = await Ticket.findOneAndUpdate(
      { _id: req.params.id, attendeeId: req.auth.attendeeId },
      { $set: { status } },
      { new: true, runValidators: true },
    );
    if (!ticket) return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Ticket not found for this attendee.' } });
    return res.status(200).json({ ticket });
  } catch (error) {
    return next(error);
  }
});

export default router;
