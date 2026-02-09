import mongoose from 'mongoose';

export const connectDb = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');
};
