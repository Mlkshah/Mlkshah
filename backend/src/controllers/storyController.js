import Story from '../models/Story.js';
import User from '../models/User.js';

export const uploadStory = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Media file is required' });

  const story = await Story.create({
    author: req.user._id,
    mediaUrl: `/uploads/${req.file.filename}`,
    mediaType: req.file.mimetype.startsWith('video') ? 'video' : 'image',
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
  });

  res.status(201).json(story);
};

export const storyFeed = async (req, res) => {
  const me = await User.findById(req.user._id);
  const userIds = [req.user._id, ...me.following];
  const stories = await Story.find({ author: { $in: userIds }, expiresAt: { $gt: new Date() } })
    .populate('author', 'username avatarUrl')
    .sort({ createdAt: -1 });

  res.json(stories);
};
