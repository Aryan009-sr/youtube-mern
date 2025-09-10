import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { createChannel, getChannelDetails } from '../controllers/channelController.js';

const router = Router();

// @route   POST api/channels
// @desc    Create a new channel
// @access  Private
router.post('/', protect, createChannel);
router.get('/:channelId', getChannelDetails);
export default router;