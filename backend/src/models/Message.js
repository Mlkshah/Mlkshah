import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: String,
    mediaUrl: String,
    mediaType: { type: String, enum: ['image', 'video'] }
  },
  { timestamps: true }
);

export default mongoose.model('Message', messageSchema);
