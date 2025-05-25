import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  user: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
