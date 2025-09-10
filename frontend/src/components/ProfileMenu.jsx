// src/components/ProfileMenu.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MdOutlineSwitchAccount,
  MdOutlineExitToApp,
  MdOutlineSettings,
  MdOutlineHelpOutline,
  MdOutlineFeedback,
} from 'react-icons/md';

const ProfileMenu = ({ user, logout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getUserInitial = (username) => {
    return username ? username.charAt(0).toUpperCase() : '';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) {
    return null; // Don't render if user is not logged in
  }

  // ✅ Check if the user really has a custom profile image
  const hasRealImage =
    user.profileImage && user.profileImage !== 'https://via.placeholder.com/48';

  return (
    <div className="relative" ref={menuRef}>
      {/* Small profile icon */}
      <div
        className={`w-8 h-8 rounded-full cursor-pointer ${
          hasRealImage
            ? ''
            : 'bg-blue-500 flex items-center justify-center text-lg font-bold text-white'
        }`}
        onClick={handleProfileClick}
      >
        {hasRealImage ? (
          <img
            src={user.profileImage}
            alt="User Profile"
            className="w-full h-full rounded-full object-cover"
          />
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
                hasRealImage
                  ? ''
                  : 'bg-blue-500 flex items-center justify-center text-2xl font-bold text-white'
              }`}
            >
              {hasRealImage ? (
                <img
                  src={user.profileImage}
                  alt="User Profile"
                  className="w-full h-full rounded-full object-cover"
                />
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
