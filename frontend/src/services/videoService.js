import axios from 'axios';

// Base URL for videos API
const API_URL = 'http://localhost:5000/api/videos';

// Create a new video
export const createVideo = async (videoData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(API_URL, videoData, config);
  return response.data;
};

// Update an existing video
export const updateVideo = async (videoId, updatedData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.put(`${API_URL}/${videoId}`, updatedData, config);
  return response.data;
};

// Delete a video
export const deleteVideo = async (videoId, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.delete(`${API_URL}/${videoId}`, config);
  return response.data;
};
