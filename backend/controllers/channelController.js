import User from '../models/User.js';
import Video from '../models/Video.js';
import Channel from '../models/Channel.js'; 

// @desc    Create a new channel
// @route   POST /api/channels
export const createChannel = async (req, res) => {
    try {
        const { handle, name, description } = req.body;
        const userId = req.user.id; 

        if (!userId) {
            return res.status(401).json({ msg: 'Not authorized, missing user ID' });
        }

        // Check if the user already has a channel
        const userHasChannel = await Channel.findOne({ userId });
        if (userHasChannel) {
            return res.status(400).json({ msg: 'User already has a channel' });
        }

        // Create a new channel document
        const newChannel = new Channel({
            userId, 
            name: name || req.user.username,
            handle,
            description,
        });

        await newChannel.save();

        // Update the user's hasChannel flag and channelId
        await User.findByIdAndUpdate(userId, { hasChannel: true, channelId: newChannel._id }, { new: true });

        res.status(201).json({ msg: 'Channel created successfully', channel: newChannel });

    } catch (err) {
        console.error(err.message);
        if (err.code === 11000) {
             return res.status(400).json({ msg: 'Channel with that handle already exists.' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Get channel details and videos
// @route   GET /api/channels/:channelId
export const getChannelDetails = async (req, res) => {
    try {
        const { channelId } = req.params;
        console.log("Fetching channel details for ID:", channelId);

        // 1. Find the channel by its ID
        const channel = await Channel.findById(channelId);
        if (!channel) {
            return res.status(404).json({ msg: 'Channel not found' });
        }
        
        // 2. Find all videos by the channel owner's userId
        const videos = await Video.find({ userId: channel.userId }).sort({ createdAt: -1 });

        // 3. Send back the combined data
        res.json({
            channel: {
                _id: channel._id,
                userId: channel.userId,
                name: channel.name,
                handle: channel.handle,
                description: channel.description,
                subscribers: channel.subscribers,
                profileImage: channel.profileImage,
                banner: channel.banner,
            },
            videos: videos,
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};