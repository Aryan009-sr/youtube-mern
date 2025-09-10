import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { 
    getAllVideos, 
    searchVideos, 
    getVideoById, 
    likeVideo, 
    dislikeVideo,
    createVideo,
    updateVideo,
    deleteVideo
} from '../controllers/videoController.js';

const router = Router();

router.get('/', getAllVideos);
router.get('/search', searchVideos);
router.get('/:id', getVideoById);

router.post('/', protect , createVideo);
router.post('/:id', protect, updateVideo);
router.delete('/:id', protect, deleteVideo);

router.put('/like/:id', protect, likeVideo);
router.put('/dislike/:id', protect, dislikeVideo);

export default router;