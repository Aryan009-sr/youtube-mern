import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  createVideo,
  updateVideo,
  deleteVideo,
} from '../services/videoService';

const ChannelPage = () => {
  const { channelId } = useParams();
  const { user, token } = useAuth();

  const [channelData, setChannelData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoThumbnail, setNewVideoThumbnail] = useState('');
  const [newVideoDescription, setNewVideoDescription] = useState('');
  const [editingVideoId, setEditingVideoId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/channels/${channelId}`);
        const data = await res.json();
        console.log("Channel API response: ", data);
        setChannelData(data.channel);
        setVideos(data.videos);
        setLoading(false);
      } catch (err) {
        setError('Error fetching channel data.');
        setLoading(false);
      }
    };

    if (channelId) fetchChannel();
  }, [channelId]);

  const handleCreate = async () => {
    if (!newVideoTitle || !newVideoThumbnail || !newVideoDescription) return;
    try {
      const videoData = {
        title: newVideoTitle,
        thumbnailUrl: newVideoThumbnail,
        description: newVideoDescription,
        videoUrl: 'https://example.com/video.mp4',
        userId: user._id,
      };

      const createdVideo = await createVideo(videoData, token);
      setVideos([{ ...createdVideo, userId: user._id},  ...videos]);
      setNewVideoTitle('');
      setNewVideoThumbnail('');
      setNewVideoDescription('');
    } catch (err) {
      console.error(err);
      alert('Failed to create video.'); 
    }
  };

  const handleUpdate = async (videoId) => {
    if (!editingTitle) return;
    try {
      const updatedVideo = await updateVideo(videoId, { title: editingTitle }, token);
      setVideos(videos.map(v => (v._id === videoId ? updatedVideo : v)));
      setEditingVideoId(null);
      setEditingTitle('');
    } catch (err) {
      console.error(err);
      alert('Failed to update video.');
    }
  };

  const handleDelete = async (videoId) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    try {
      await deleteVideo(videoId, token);
      setVideos(videos.filter(v => v._id !== videoId));
    } catch (err) {
      console.error(err);
      alert('Failed to delete video.');
    }
  };

  if (loading) return <div className="text-white p-6">Loading channel...</div>;
  if (error) return <div className="text-red-500 p-6">{error}</div>;
  if (!channelData) return <div className="text-white p-6">Channel not found.</div>;

  return (
    <div className="bg-[#0f0f0f] min-h-screen mt-10 text-white">
      {/* Banner */}
      <div className="w-full h-38 bg-neutral-800">
        <img
          src={channelData.banner || "/images/channelb.jpg"}
          alt="Channel Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Channel Header */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-neutral-800">
        <div className="flex items-center space-x-4">
          <img
            src={channelData.profileImage || "/images/profile.jpg"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold">{channelData.name}</h1>
            <p className="text-neutral-400">@{channelData.handle}</p>
            <p className="text-neutral-500">{videos.length} videos</p>
          </div>
        </div>
        <div>
          {user && user._id === channelData.userId ? (
            <button className="bg-neutral-800 px-4 py-2 rounded-lg hover:bg-neutral-700">
              Customize Channel
            </button>
          ) : (
            <button className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700">
              Subscribe
            </button>
          )}
        </div>
      </div>

      {/* Upload Section (only for owner) */}
      {user && user._id === channelData.userId && (
        <div className="p-6 border-b border-neutral-800">
          <h2 className="text-xl font-semibold mb-3">Upload a New Video</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Video Title"
              value={newVideoTitle}
              onChange={(e) => setNewVideoTitle(e.target.value)}
              className="flex-1 p-2 rounded bg-neutral-900 text-white"
            />
            <input
              type="text"
              placeholder='Video Description'
              value={newVideoDescription}
              onChange={(e) => setNewVideoDescription(e.target.value)}
              className="flex-1 p-2 rounded bg-neutral-900 text-white"
            />
            <input
              type="text"
              placeholder="Thumbnail URL"
              value={newVideoThumbnail}
              onChange={(e) => setNewVideoThumbnail(e.target.value)}
              className="flex-1 p-2 rounded bg-neutral-900 text-white"
            />
            <button
              onClick={handleCreate}
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Upload
            </button>
          </div>
        </div>
      )}

      {/* Videos Grid */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div key={video._id} className="bg-neutral-900 rounded-lg overflow-hidden">
            {editingVideoId === video._id ? (
              <div className="p-4">
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="p-2 rounded w-full mb-2 text-black"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(video._id)}
                    className="bg-yellow-600 px-3 py-1 rounded hover:bg-yellow-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingVideoId(null)}
                    className="bg-gray-600 px-3 py-1 rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">{video.title}</h3>
                  <p className="text-neutral-500 text-sm">123 views • 2 days ago</p>
                  {user && user._id === video.userId && (
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => {
                          setEditingVideoId(video._id);
                          setEditingTitle(video.title);
                        }}
                        className="bg-yellow-600 px-3 py-1 rounded hover:bg-yellow-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(video._id)}
                        className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelPage;
