import 'dotenv/config';
import mongoose from 'mongoose';
import Attendee from './models/Attendee.js';
import Event from './models/Event.js';

if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI must be set in .env');

try {
  await mongoose.connect(process.env.MONGODB_URI);
  const attendee = await Attendee.findOneAndUpdate(
    { email: 'demo@eventhub.local' },
    { $setOnInsert: { name: 'EventHub Demo', email: 'demo@eventhub.local', phone: '0000000000', role: 'attendee' } },
    { new: true, upsert: true, runValidators: true },
  );
  const event = await Event.findOneAndUpdate(
    { title: 'EventHub Sample Concert' },
    { $setOnInsert: {
      title: 'EventHub Sample Concert',
      category: 'Music',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      venue: 'Community Hall',
      ticketsAvailable: 100,
    } },
    { new: true, upsert: true, runValidators: true },
  );
  console.log(JSON.stringify({ attendeeEmail: attendee.email, eventId: event.id, ticketsAvailable: event.ticketsAvailable }, null, 2));
} finally {
  await mongoose.disconnect();
}
