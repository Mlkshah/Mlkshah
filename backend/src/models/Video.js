import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: String,
    videoUrl: { type: String, required: true },
    thumbnailUrl: String
  },
  { timestamps: true }
);

export default mongoose.model('Video', videoSchema);
