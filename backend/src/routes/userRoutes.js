import express from 'express';
import { follow, me } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/me', protect, me);
router.post('/follow/:userId', protect, follow);

export default router;
