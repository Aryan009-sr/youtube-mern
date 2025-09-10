// controllers/authController.js
import User from '../models/User.js';
import Channel from '../models/Channel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ msg: 'User already exists' });
    }

    // Create new user (password will be hashed via pre-save hook)
    user = new User({ username, email, password });
    await user.save();

    // Create JWT payload
    const payload = {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        hasChannel: user.hasChannel,
        channelId: null // new users don't have a channel yet
      }
    };

    // Sign JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token with success message
    res.status(201).json({ msg: 'User registered successfully', token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Find user's channel if exists
    const channel = await Channel.findOne({ userId: user._id });

    // JWT payload
    const payload = {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        hasChannel: user.hasChannel,
        channelId: channel ? channel._id : null
      }
    };

    // Sign JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return token and user info
    res.status(200).json({ token, user: payload.user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
