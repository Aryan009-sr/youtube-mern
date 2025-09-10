import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import {
    addComment,
    editComment,
    deleteComment,
    getCommentsByVideoId
} from '../controllers/commentController.js';

const router = Router();

// Routes for comments
router.post('/:videoId', protect, addComment);
router.put('/:commentId', protect, editComment);
router.delete('/:commentId', protect, deleteComment);
router.get('/:videoId', getCommentsByVideoId);

export default router;