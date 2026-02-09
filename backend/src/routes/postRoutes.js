import express from 'express';
import { createPost, feed } from '../controllers/postController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createPost);
router.get('/feed', protect, feed);

export default router;
