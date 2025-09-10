import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FaThumbsUp, FaThumbsDown, FaShare, FaDownload } from 'react-icons/fa';
import RelatedVideoCard from '../components/RelatedVideoCard.jsx';
import Comment from '../components/Comment.jsx';

const VideoPlayer = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCommentText, setNewCommentText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch video data
        const videoRes = await axios.get(`http://localhost:5000/api/videos/${id}`);
        setVideo(videoRes.data);

        // Fetch comments for the video
        const commentsRes = await axios.get(`http://localhost:5000/api/comments/${id}`);
        setComments(commentsRes.data);

        // Fetch related videos
        const relatedVideosRes = await axios.get('http://localhost:5000/api/videos');
        const filteredVideos = relatedVideosRes.data.filter(v => v._id !== id);
        setRelatedVideos(filteredVideos.slice(0, 10));

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleLike = async () => {
    if (!user) {
      alert('Please sign in to like this video.');
      return;
    }
    try {
      const res = await axios.put(`http://localhost:5000/api/videos/like/${id}`);
      setVideo(res.data);
    } catch (err) {
      console.error("Error liking video:", err);
    }
  };

  const handleDislike = async () => {
    if (!user) {
      alert('Please sign in to dislike this video.');
      return;
    }
    try {
      const res = await axios.put(`http://localhost:5000/api/videos/dislike/${id}`);
      setVideo(res.data);
    } catch (err) {
      console.error("Error disliking video:", err);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user || newCommentText.trim() === '') {
      alert('Please sign in and enter a comment.');
      return;
    }
    try {
      const res = await axios.post(`http://localhost:5000/api/comments/${id}`, {
        comment: newCommentText,
      });
      setComments([res.data, ...comments]);
      setNewCommentText('');
    } catch (err) {
      console.error("Error adding comment:", err);
      alert(err.response?.data?.msg || 'An error occurred while adding the comment.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!user) {
      alert('Please sign in to delete this comment.');
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setComments(comments.filter(c => c._id !== commentId));
    } catch (err) {
      console.error("Error deleting comment:", err);
      alert(err.response?.data?.msg || 'An error occurred while deleting the comment.');
    }
  };

  const handleEditComment = async (commentId, updatedText) => {
    if (!user || updatedText.trim() === '') {
      alert('Please sign in and enter a valid comment.');
      return;
    }
    try {
      const res = await axios.put(
        `http://localhost:5000/api/comments/${commentId}`,
        { newCommentText: updatedText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setComments(comments.map(c => c._id === commentId ? res.data : c));
    } catch (err) {
      console.error("Error editing comment:", err);
      alert(err.response?.data?.msg || 'An error occurred while editing the comment.');
    }
  };

  if (loading) return <div className="text-center text-white mt-10">Loading video...</div>;
  if (!video) return <div className="text-center text-white mt-10">Video not found.</div>;

  const hasLiked = user && video.likes.includes(user.id);
  const hasDisliked = user && video.dislikes.includes(user.id);

  return (
    <div className="bg-[#121212] min-h-screen text-white p-4 sm:p-6 md:p-8">
      <div className="flex flex-col lg:flex-row lg:space-x-8 max-w-7xl mx-auto">
        {/* Main Video Section */}
        <div className="lg:w-2/3">
          {/* Video Player */}
          <div className="w-full aspect-video mb-4">
            <iframe
              className="w-full h-full rounded-xl"
              src={video.videoUrl}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Title + Subscribe Row */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">{video.title}</h1>
            {video.userId && (
              <button className="mt-2 md:mt-0 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full transition-colors">
                Subscribe
              </button>
            )}
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center space-x-2 sm:space-x-4 mb-2">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-colors ${hasLiked ? 'bg-blue-600' : 'bg-neutral-700 hover:bg-neutral-600'}`}
            >
              <FaThumbsUp /> <span className="text-sm">{video.likes.length}</span>
            </button>
            <button
              onClick={handleDislike}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-colors ${hasDisliked ? 'bg-blue-600' : 'bg-neutral-700 hover:bg-neutral-600'}`}
            >
              <FaThumbsDown /> <span className="text-sm">{video.dislikes.length}</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 rounded-full bg-neutral-700 hover:bg-neutral-600 transition-colors">
              <FaShare /> <span className="text-sm">Share</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 rounded-full bg-neutral-700 hover:bg-neutral-600 transition-colors">
              <FaDownload /> <span className="text-sm">Download</span>
            </button>
          </div>

          {/* Views and Uploaded Time */}
          <p className="text-sm text-neutral-400 mb-4">
            {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
          </p>

          {/* Description */}
          <p className="text-sm text-neutral-300 mb-6">{video.description}</p>
          <hr className="border-neutral-700 mb-6" />

          {/* Comment Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Comments ({comments.length})</h3>
            <form onSubmit={handleAddComment} className="flex space-x-2 mb-6">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Add a public comment..."
                className="flex-1 bg-neutral-800 border-b-2 border-neutral-700 focus:border-white focus:outline-none p-2 rounded"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Comment
              </button>
            </form>
            <div className="space-y-4">
              {comments.map((c) => (
                <Comment
                  key={c._id}
                  comment={c}
                  user={user}
                  onDelete={handleDeleteComment}
                  onEdit={handleEditComment}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Related Videos Section */}
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <h3 className="text-xl font-semibold mb-4">Related Videos</h3>
          <div className="space-y-3">
            {relatedVideos.map(relatedVideo => (
              <RelatedVideoCard key={relatedVideo._id} video={relatedVideo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;