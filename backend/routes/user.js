import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { getCurrentUser } from '../controllers/userController.js';

const router = Router();

// @route   GET /api/users/me
// @desc    Get current logged-in user
// @access  Private
router.get('/me', protect, getCurrentUser);

export default router;