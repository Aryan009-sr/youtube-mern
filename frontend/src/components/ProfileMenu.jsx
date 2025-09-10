import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineSwitchAccount, MdOutlineExitToApp, MdOutlineSettings, MdOutlineHelpOutline, MdOutlineFeedback } from 'react-icons/md';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ProfileMenu = () => {
  const { user, logout, updateUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  // Fetch latest user data when menu opens
  const handleProfileClick = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/me');
      updateUser(res.data.user); // Update context with fresh user data
    } catch (err) {
      console.error('Failed to fetch latest user data:', err);
    }
    setIsMenuOpen(prev => !prev); // toggle menu after fetch
  };

  // Get initial from username
  const getUserInitial = (username) => username ? username.charAt(0).toUpperCase() : '';

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null; // Don't render if not logged in

  const hasRealImage = user.profileImage && user.profileImage !== 'https://via.placeholder.com/48';

  return (
    <div className="relative" ref={menuRef}>
      {/* Small profile icon */}
      <div
        className={`w-8 h-8 rounded-full cursor-pointer ${
          hasRealImage ? '' : 'bg-blue-500 flex items-center justify-center text-lg font-bold text-white'
        }`}
        onClick={handleProfileClick}
      >
        {hasRealImage ? (
          <img src={user.profileImage} alt="User Profile" className="w-full h-full rounded-full object-cover" />
        ) : (
          <span>{getUserInitial(user.username)}</span>
        )}
      </div>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-[#282828] rounded-xl shadow-lg border border-gray-700 z-50 py-2">
          {/* Profile Section */}
          <div className="flex items-center p-4 border-b border-gray-700">
            <div
              className={`w-10 h-10 rounded-full mr-3 ${
                hasRealImage ? '' : 'bg-blue-500 flex items-center justify-center text-2xl font-bold text-white'
              }`}
            >
              {hasRealImage ? (
                <img src={user.profileImage} alt="User Profile" className="w-full h-full rounded-full object-cover" />
              ) : (
                <span>{getUserInitial(user.username)}</span>
              )}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white">{user.username}</p>
              <p className="text-sm text-gray-400">@{user.username}</p>
              {user.hasChannel && user.channelId && (
                <Link
                  to={`/channel/${user.channelId}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm text-blue-400 hover:text-blue-200 mt-1 block"
                >
                  View your Channel
                </Link>
              )}
            </div>
          </div>

          {/* Account Actions */}
          <div className="py-2 border-b border-gray-700">
            <button className="flex items-center w-full px-4 py-2 text-white hover:bg-gray-600">
              <MdOutlineSwitchAccount className="text-xl mr-3" />
              Switch account
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-white hover:bg-gray-600"
            >
              <MdOutlineExitToApp className="text-xl mr-3" />
              Sign out
            </button>
          </div>

          {/* Static Options */}
          <div className="py-2">
            <button className="flex items-center w-full px-4 py-2 text-white hover:bg-gray-600">
              <MdOutlineSettings className="text-xl mr-3" />
              Settings
            </button>
            <button className="flex items-center w-full px-4 py-2 text-white hover:bg-gray-600">
              <MdOutlineHelpOutline className="text-xl mr-3" />
              Help
            </button>
            <button className="flex items-center w-full px-4 py-2 text-white hover:bg-gray-600">
              <MdOutlineFeedback className="text-xl mr-3" />
              Send feedback
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfileMenu;
