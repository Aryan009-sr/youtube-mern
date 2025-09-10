import User from '../models/User.js';
import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = Router();

// @route  POST /api/auth/register
router.post('/register', registerUser);

// @route  POST /api/auth/login
router.post('/login', loginUser);

export default router;