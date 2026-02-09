import Post from '../models/Post.js';
import User from '../models/User.js';

export const createPost = async (req, res) => {
  const post = await Post.create({ author: req.user._id, text: req.body.text });
  res.status(201).json(post);
};

export const feed = async (req, res) => {
  const me = await User.findById(req.user._id);
  const userIds = [req.user._id, ...me.following];

  const posts = await Post.find({ author: { $in: userIds } })
    .populate('author', 'username avatarUrl')
    .sort({ createdAt: -1 })
    .limit(50);

  res.json(posts);
};
