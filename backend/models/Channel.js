import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // This creates the link to the User model
        unique: true, // A user can only have one channel
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    handle: {
        type: String,
        required: true,
        unique: true, // Ensures channel handles are unique
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
        trim: true,
        default: 'No description provided.'
    },
    profileImage: {
        type: String,
        default: '/images/profile.jpg',
    },
    banner: {
        type: String,
        default: '/images/channelb.jpg',
    },
    subscribers: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Channel = mongoose.model('Channel', channelSchema);

export default Channel;