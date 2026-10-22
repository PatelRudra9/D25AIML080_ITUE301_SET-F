import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, minlength: 3 },
  category: { type: String, required: true, trim: true, minlength: 2 },
  date: { type: Date, required: true },
  venue: { type: String, required: true, trim: true, minlength: 2 },
  ticketsAvailable: { type: Number, required: true, min: 0, validate: Number.isInteger },
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
