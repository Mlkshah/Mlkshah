import express from 'express';
import { myVideos, uploadVideo } from '../controllers/videoController.js';
import { upload } from '../config/upload.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, upload.single('video'), uploadVideo);
router.get('/mine', protect, myVideos);

export default router;
