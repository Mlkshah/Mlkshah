import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    name: String,
    isGroup: { type: Boolean, default: false },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' }
  },
  { timestamps: true }
);

export default mongoose.model('Conversation', conversationSchema);
