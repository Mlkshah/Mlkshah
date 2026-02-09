import User from '../models/User.js';

export const me = async (req, res) => {
  res.json(req.user);
};

export const follow = async (req, res) => {
  const targetId = req.params.userId;
  const meUser = await User.findById(req.user._id);
  const target = await User.findById(targetId);
  if (!target) return res.status(404).json({ message: 'User not found' });

  const already = meUser.following.some((id) => id.toString() === targetId);
  if (already) {
    meUser.following = meUser.following.filter((id) => id.toString() !== targetId);
    target.followers = target.followers.filter((id) => id.toString() !== meUser._id.toString());
  } else {
    meUser.following.push(targetId);
    target.followers.push(meUser._id);
  }

  await meUser.save();
  await target.save();
  res.json({ following: meUser.following, followers: target.followers, isFollowing: !already });
};
