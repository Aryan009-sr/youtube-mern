import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const CreateChannelPage = () => {
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState(user?.username || '');
  const [handle, setHandle] = useState('');
  const [profileImage, setProfileImage] = useState(user?.profileImage || '');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.hasChannel) {
      navigate(`/channel/${user.channelId}`);
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {
      const res = await axios.post(
        'http://localhost:5000/api/channels',
        { name, handle, profileImage },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      // Update the user state with the new channel info, including the channelId
      updateUser({
        ...user,
        hasChannel: true,
        channelId: res.data.channel._id
      });

      // Redirect to the new channel page using the channel's ID
      navigate(`/channel/${res.data.channel._id}`);

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || 'Error creating channel');
    }
  };

  return (
    <div className="bg-[#121212] min-h-screen flex items-center justify-center text-white p-8">
      <div className="bg-[#1e1e1e] p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">How you'll appear</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-neutral-700 flex items-center justify-center overflow-hidden mb-4">
              <img src={profileImage || 'https://via.placeholder.com/96'} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button type="button" className="text-blue-500 hover:underline">
              Select picture
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-neutral-400 text-sm mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-neutral-800 text-white border border-neutral-700 p-2 rounded-lg"
            />
          </div>
          <div className="mb-6">
            <label className="block text-neutral-400 text-sm mb-2" htmlFor="handle">
              Handle
            </label>
            <input
              id="handle"
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="@yourhandle"
              className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <p className="text-xs text-neutral-500 mb-6 text-center">
            By clicking "Create channel" you agree to YouTube's Terms of Service. Changes made to your name and profile picture are visible only on YouTube and not other Google services.
            <a href="#" className="text-blue-500 hover:underline">Learn more</a>
          </p>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-neutral-400 hover:text-white px-4 py-2 rounded-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors"
            >
              Create channel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChannelPage;