import Video from '../models/Video.js';

// A helper function to populate user details
const populateUser = (query) => {
    return query.populate('userId', 'username profileImage');
};

// @desc    Get all videos
export const getAllVideos = async (req, res) => {
    try {
        let query = Video.find().sort({ createdAt: -1 });
        if (req.query.populate === 'true') {
            query = populateUser(query);
        }
        const videos = await query.exec();
        res.json(videos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Search for videos
export const searchVideos = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ msg: 'Search query is required' });
        }
        const videos = await Video.find({ $text: { $search: q } })
            .populate('userId', 'username profileImage');
        res.json(videos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get a single video by ID
export const getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id)
            .populate('userId', 'username profileImage');
        if (!video) {
            return res.status(404).json({ msg: 'Video not found' });
        }
        video.views += 1;
        await video.save();
        res.json(video);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Video not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Like a video
export const likeVideo = async (req, res) => {
    try {
        const video = await Video.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { likes: req.user.id }, $pull: { dislikes: req.user.id } },
            { new: true }
        ).populate('userId', 'username profileImage');
        if (!video) return res.status(404).json({ msg: 'Video not found' });
        res.json(video);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Dislike a video
export const dislikeVideo = async (req, res) => {
    try {
        const video = await Video.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { dislikes: req.user.id }, $pull: { likes: req.user.id } },
            { new: true }
        ).populate('userId', 'username profileImage');
        if (!video) return res.status(404).json({ msg: 'Video not found' });
        res.json(video);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create a new video (for channel)
// @route   POST /api/videos
// @access  Private
export const createVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnailUrl, duration, tags, category } = req.body;

    const newVideo = new Video({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      duration: duration || '00:00',
      tags: tags || [],
      category: category || 'channel',
      userId: req.user.id, // Only the logged-in user can create
    });

    const savedVideo = await newVideo.save();
    await savedVideo.populate('userId', 'username profileImage');
    res.status(201).json(savedVideo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update a video
// @route   PUT /api/videos/:id
// @access  Private
export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ msg: 'Video not found' });

    if (video.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    const updatedFields = req.body;
    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, updatedFields, { new: true })
      .populate('userId', 'username profileImage');

    res.json(updatedVideo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a video
// @route   DELETE /api/videos/:id
// @access  Private
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ msg: 'Video not found' });

    if (video.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    await video.remove();
    res.json({ msg: 'Video deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};