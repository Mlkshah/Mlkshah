import express from 'express';
import { createConversation, getMessages, listConversations, sendMessage } from '../controllers/chatController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../config/upload.js';

const router = express.Router();

router.post('/conversations', protect, createConversation);
router.get('/conversations', protect, listConversations);
router.get('/messages/:conversationId', protect, getMessages);
router.post('/messages', protect, upload.single('media'), sendMessage);

export default router;
