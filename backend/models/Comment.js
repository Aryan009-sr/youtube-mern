import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comment: {
        type: String,
        required: [true, 'Comment cannot be empty'],
    }

}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;