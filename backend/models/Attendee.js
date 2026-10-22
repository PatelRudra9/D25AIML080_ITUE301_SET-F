import mongoose from 'mongoose';

const attendeeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2 },
  email: { type: String, required: true, trim: true, lowercase: true, unique: true },
  phone: { type: String, required: true, trim: true, minlength: 7 },
  role: { type: String, required: true, enum: ['attendee', 'organizer', 'admin'], default: 'attendee' },
}, { timestamps: true });

export default mongoose.model('Attendee', attendeeSchema);
