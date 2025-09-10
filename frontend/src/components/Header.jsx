import React, { useState, useContext } from 'react';
import { FaYoutube } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { IoIosNotificationsOutline, IoMdVideocam } from 'react-icons/io';
import { IoArrowBack } from 'react-icons/io5';
import ProfileMenu from './ProfileMenu';

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setMobileSearchOpen(false); // close overlay after search
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-[#212121] text-white p-3 sm:p-4 flex items-center justify-between">
      {/* Normal Header */}
      {!mobileSearchOpen && (
        <>
          {/* Left Section: Logo & Sidebar Toggle */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={toggleSidebar}
              className="text-white p-2 hover:bg-[#383838] rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link to="/" className="flex items-center space-x-1.5">
              <FaYoutube className="text-red-500 text-2xl sm:text-3xl" />
              <span className="text-lg sm:text-xl font-bold tracking-tight">YouTube</span>
            </Link>
          </div>

          {/* Search Bar (Desktop/Tablet) */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-grow max-w-lg lg:max-w-2xl mx-4 lg:mx-12 items-center"
          >
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 px-4 rounded-l-full bg-[#121212] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3EA6FF]"
            />
            <button
              type="submit"
              className="bg-[#383838] p-2 rounded-r-full hover:bg-gray-600 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>

          {/* Mobile Search Icon */}
          <button
            onClick={() => setMobileSearchOpen(true)}
            className="md:hidden p-2 rounded-full hover:bg-[#383838]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Right Section */}
          <div className="flex items-center space-x-3 sm:space-x-4 pr-2 sm:pr-4">
            {user ? (
              <>
                {/* Show only on large screens */}
                <Link
                  to="/create-channel"
                  className="hidden lg:inline bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full transition-colors"
                >
                  Create Channel
                </Link>

                {/* Always show */}
                <IoMdVideocam className="h-6 w-6 sm:h-7 sm:w-7 cursor-pointer hover:text-gray-400" />

                {/* Notifications hidden on mobile */}
                <IoIosNotificationsOutline className="hidden sm:block h-6 w-6 sm:h-7 sm:w-7 cursor-pointer hover:text-gray-400" />

                <ProfileMenu user={user} logout={logout} />
              </>
            ) : (
              <Link to="/login">
                <button className="flex items-center space-x-2 border border-[#303030] py-1.5 px-4 rounded-full font-semibold text-[#3EA6FF] hover:bg-[#3EA6FF] hover:text-white transition duration-300 ease-in-out">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.121 17.804A11.956 11.956 0 0112 16.5c2.56 0 4.957.943 6.879 2.5a.75.75 0 001.298-.558c-.012-.667-.143-1.312-.387-1.921A11.956 11.956 0 0012 11.5c-2.56 0-4.957.943-6.879 2.5a.75.75 0 00-1.298-.558z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9a3 3 0 100-6 3 3 0 000 6z" />
                  </svg>
                  <span>Sign In</span>
                </button>
              </Link>
            )}
          </div>
        </>
      )}

      {/* Mobile Search Overlay */}
      {mobileSearchOpen && (
        <form
          onSubmit={handleSearch}
          className="absolute top-0 left-0 w-full bg-[#212121] p-3 flex items-center z-50"
        >
          <button
            type="button"
            onClick={() => setMobileSearchOpen(false)}
            className="p-2 mr-2 rounded-full hover:bg-[#383838]"
          >
            <IoArrowBack className="h-6 w-6 text-gray-300" />
          </button>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow py-2 px-4 rounded-l-full bg-[#121212] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3EA6FF]"
          />
          <button
            type="submit"
            className="bg-[#383838] p-2 rounded-r-full hover:bg-gray-600 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>
      )}
    </header>
  );
};

export default Header;
