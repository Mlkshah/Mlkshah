import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';

export const createConversation = async (req, res) => {
  const { memberIds = [], name } = req.body;
  const uniqueMembers = [...new Set([req.user._id.toString(), ...memberIds])];

  const conversation = await Conversation.create({
    name,
    isGroup: uniqueMembers.length > 2,
    members: uniqueMembers
  });

  res.status(201).json(conversation);
};

export const listConversations = async (req, res) => {
  const conversations = await Conversation.find({ members: req.user._id })
    .populate('members', 'username avatarUrl')
    .populate('lastMessage')
    .sort({ updatedAt: -1 });
  res.json(conversations);
};

export const sendMessage = async (req, res) => {
  const { conversationId, text } = req.body;

  const message = await Message.create({
    conversation: conversationId,
    sender: req.user._id,
    text,
    mediaUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
    mediaType: req.file ? (req.file.mimetype.startsWith('video') ? 'video' : 'image') : undefined
  });

  await Conversation.findByIdAndUpdate(conversationId, { lastMessage: message._id }, { new: true });
  const full = await Message.findById(message._id).populate('sender', 'username avatarUrl');

  req.io.to(conversationId).emit('chat:message', full);
  res.status(201).json(full);
};

export const getMessages = async (req, res) => {
  const messages = await Message.find({ conversation: req.params.conversationId })
    .populate('sender', 'username avatarUrl')
    .sort({ createdAt: 1 });
  res.json(messages);
};
