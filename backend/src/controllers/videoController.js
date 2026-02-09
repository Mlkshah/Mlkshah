import Video from '../models/Video.js';

export const uploadVideo = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Video file is required' });

  const video = await Video.create({
    owner: req.user._id,
    title: req.body.title,
    description: req.body.description,
    videoUrl: `/uploads/${req.file.filename}`
  });

  res.status(201).json(video);
};

export const myVideos = async (req, res) => {
  const videos = await Video.find({ owner: req.user._id }).sort({ createdAt: -1 });
  res.json(videos);
};
