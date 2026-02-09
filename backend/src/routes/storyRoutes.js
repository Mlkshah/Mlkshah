import express from 'express';
import { storyFeed, uploadStory } from '../controllers/storyController.js';
import { upload } from '../config/upload.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, upload.single('media'), uploadStory);
router.get('/feed', protect, storyFeed);

export default router;
