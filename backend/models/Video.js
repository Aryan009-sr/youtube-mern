import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    likes: {
        type: [String],
        default: [],
    },
    dislikes: {
        type: [String],
        default: [],
    },
    tags: {
        type: [String],
        default: [],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    duration: { 
        type: String,
        default: '00:00',
    },
    category: {
        type: String,
        enum: ['homepage', 'channel'], 
        default: 'homepage',
    },
}, { timestamps: true });

videoSchema.index({ 
    title: 'text',
    description: 'text',
    tags: 'text'
});

const Video = mongoose.model('Video', videoSchema);
export default Video;