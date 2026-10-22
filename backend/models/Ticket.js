import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  attendeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Attendee', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  quantity: { type: Number, required: true, min: 1, validate: Number.isInteger },
  bookingDate: { type: Date, required: true, default: Date.now },
  status: { type: String, required: true, enum: ['booked', 'cancelled', 'used'], default: 'booked' },
}, { timestamps: true });

export default mongoose.model('Ticket', ticketSchema);
