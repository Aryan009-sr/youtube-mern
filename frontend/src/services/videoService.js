// src/services/videoService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getChannelVideos = async (channelId) => {
  const res = await axios.get(`${API_URL}/api/channels/${channelId}`);
  return res.data.videos;
};

export const deleteVideo = async (videoId, token) => {
  const res = await axios.delete(`${API_URL}/api/videos/${videoId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
