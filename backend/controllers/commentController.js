import Comment from '../models/Comment.js';
import Video from '../models/Video.js';

// @desc    Add a comment to a video
// @route   POST /api/comments/:videoId
// @access  Private
export const addComment = async (req, res) => {
    const { comment } = req.body;
    try {
        const newComment = new Comment({
            videoId: req.params.videoId,
            userId: req.user.id,
            comment: comment
        });

        // 1. Save the new comment to the database
        await newComment.save();

        // 2. Find the newly created comment and populate the user data
        const populatedComment = await Comment.findById(newComment._id)
            .populate('userId', 'username profileImage');

        // 3. Send back the populated comment to the frontend
        res.status(201).json(populatedComment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Edit a comment
// @route   PUT /api/comments/:commentId
// @access  Private
export const editComment = async (req, res) => {
    const { newCommentText } = req.body;
    try {
        const comment = await Comment.findOneAndUpdate(
            { _id: req.params.commentId, userId: req.user.id },
            { comment: newCommentText },
            { new: true }
        );
        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found or user not authorized' });
        }
        res.json(comment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a comment
// @route   DELETE /api/comments/:commentId
// @access  Private
export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findOneAndDelete({ _id: req.params.commentId, userId: req.user.id });
        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found or user not authorized' });
        }
        res.json({ msg: 'Comment removed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get all comments for a video
// @route   GET /api/comments/:videoId
// @access  Public
export const getCommentsByVideoId = async (req, res) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId })
            .populate('userId', 'username profileImage') 
            .sort({ createdAt: -1 });

        res.json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};