import React from 'react';
import { Link } from 'react-router-dom';
import {
  MdHomeFilled,
  MdOutlineSubscriptions,
  MdOutlineVideoLibrary,
  MdHistory,
  MdOutlineWatchLater,
  MdOutlineThumbUp,
  MdOutlineAccountCircle,
  MdOutlineExplore,
  MdOutlineShoppingBag,
  MdOutlineMusicNote,
  MdOutlineLocalMovies,
  MdOutlineLiveTv,
  MdOutlineNewspaper,
  MdOutlineSportsSoccer,
  MdOutlineSchool,
  MdOutlineWbSunny,
  MdOutlineMic,
} from 'react-icons/md';
import { FiPlayCircle } from 'react-icons/fi';
import { BsFire } from 'react-icons/bs';
import { IoGameControllerOutline } from 'react-icons/io5';

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`fixed top-16 left-0 h-full bg-[#212121] border-r border-gray-700 pt-6 pb-20 overflow-y-auto z-10 transition-all duration-300 ${isOpen ? 'w-56 px-4' : 'w-16'
        }`}
    >
      <nav>
        {isOpen ? (
          <>
            {/* Full Sidebar View */}
            <div className="pb-4 border-b border-gray-700">
              <ul className="text-sm font-medium">
                <li className="mb-1">
                  <Link
                    to="/"
                    className="flex items-center space-x-6 p-2 rounded-lg text-white bg-[#383838]"
                  >
                    <MdHomeFilled className="text-2xl" />
                    <span>Home</span>
                  </Link>
                </li>
                <li className="mb-1">
                  <div
                    className="flex items-center space-x-6 p-2 rounded-lg text-white hover:bg-[#383838]"
                  >
                    <BsFire className="text-xl" />
                    <span>Shorts</span>
                  </div>
                </li>
                <li className="mb-1">
                  <div
                    className="flex items-center space-x-6 p-2 rounded-lg text-white hover:bg-[#383838]"
                  >
                    <MdOutlineSubscriptions className="text-2xl" />
                    <span>Subscriptions</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Explore Section */}
            <div className="py-4 border-b border-gray-700">
              <h2 className="text-sm font-semibold text-gray-400 px-2 mb-2">Explore</h2>
              <ul className="text-sm font-medium">
                <li className="mb-1">
                  <div
                    className="flex items-center space-x-6 p-2 rounded-lg text-white hover:bg-[#383838]"
                  >
                    <MdOutlineExplore className="text-2xl" />
                    <span>Trending</span>
                  </div>
                </li>
                <li className="mb-1">
                  <div
                    className="flex items-center space-x-6 p-2 rounded-lg text-white hover:bg-[#383838]"
                  >
                    <MdOutlineShoppingBag className="text-2xl" />
                    <span>Shopping</span>
                  </div>
                </li>
                <li className="mb-1">
                  <div
                    className="flex items-center space-x-6 p-2 rounded-lg text-white hover:bg-[#383838]"
                  >
                    <MdOutlineMusicNote className="text-2xl" />
                    <span>Music</span>
                  </div>
                </li>
                <li className="mb-1">
                  <div
                    className="flex items-center space-x-6 p-2 rounded-lg text-white hover:bg-[#383838]"
                  >
                    <MdOutlineLocalMovies className="text-2xl" />
                    <span>Movies</span>
                  </div>
                </li>
                <li className="mb-1">
                  <div
                    className="flex items-center space-x-6 p-2 rounded-lg text-white hover:bg-[#383838]"
                  >
                    <MdOutlineLiveTv className="text-2xl" />
                    <span>Live</span>
                  </div>
                </li>
                <li className="mb-1">
                  <div
                    className="flex items-center space-x-6 p-2 rounded-lg text-white hover:bg-[#383838]"
                  >
                    <IoGameControllerOutline className="text-2xl" />
                    <span>Gaming</span>
                  </div>
                </li>
                <li className="mb-1">
                  <div
                    className="flex items-center space-x-6 p-2 rounded-lg text-white hover:bg-[#383838]"
                  >
                    <MdOutlineNewspaper className="text-2xl" />
                    <span>News</span>
                  </div>
                </li>
                <li className="mb-1">
                  <div
                    className="flex items-center space-x-6 p-2 rounded-lg text-white hover:bg-[#383838]"
                  >
                    <MdOutlineSportsSoccer className="text-2xl" />
                    <span>Sports</span>
                  </div>
                </li>
                <li className="mb-1">
                  <div
                    className="flex items-center space-x-6 p-2 rounded-lg text-white hover:bg-[#383838]"
                  >
                    <MdOutlineSchool className="text-2xl" />
                    <span>Courses</span>
                  </div>
                </li>
                <li className="mb-1">
                  <div
                    className="flex items-center space-x-6 p-2 rounded-lg text-white hover:bg-[#383838]"
                  >
                    <MdOutlineWbSunny className="text-2xl" />
                    <span>Fashion & Beauty</span>
                  </div>
                </li>
                <li className="mb-1">
                  <div
                    className="flex items-center space-x-6 p-2 rounded-lg text-white hover:bg-[#383838]"
                  >
                    <MdOutlineMic className="text-2xl" />
                    <span>Podcasts</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* "You" Section */}
            <div className="py-4 border-b border-gray-700">
              <h2 className="text-sm font-semibold text-gray-400 px-2 mb-2">You</h2>
              <ul className="text-sm font-medium">
                <li className="mb-1">
                  <div
                    className="flex items-center space-x-6 p-2 rounded-lg text-white hover:bg-[#383838]"
                  >
                    <MdHistory className="text-2xl" />
                    <span>History</span>
                  </div>
                </li>
                <li className="mb-1">
                  <div
                    className="flex items-center space-x-6 p-2 rounded-lg text-white hover:bg-[#383838]"
                  >
                    <FiPlayCircle className="text-2xl" />
                    <span>Playlists</span>
                  </div>
                </li>
                <li className="mb-1">
                  <div
                    className="flex items-center space-x-6 p-2 rounded-lg text-white hover:bg-[#383838]"
                  >
                    <MdOutlineThumbUp className="text-2xl" />
                    <span>Liked videos</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Subscriptions Section */}
            <div className="py-4">
              <h2 className="text-sm font-semibold text-gray-400 px-2 mb-2">Subscriptions</h2>
              <ul className="text-sm font-medium">
                <li className="mb-1">
                  <div className="flex items-center space-x-4 p-2 rounded-lg text-white hover:bg-[#383838]">
                    <img
                      src="https://via.placeholder.com/24"
                      alt="Channel"
                      className="w-6 h-6 rounded-full"
                    />
                    <span>Channel 1</span>
                  </div>
                </li>
                <li className="mb-1">
                  <div className="flex items-center space-x-4 p-2 rounded-lg text-white hover:bg-[#383838]">
                    <img
                      src="https://via.placeholder.com/24"
                      alt="Channel"
                      className="w-6 h-6 rounded-full"
                    />
                    <span>Channel 2</span>
                  </div>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            {/* Collapsed Sidebar View (Icons Only) */}
            <ul className="text-sm font-medium">
              <li className="mb-1">
                <Link
                  to="/"
                  className="flex flex-col items-center justify-center p-2 rounded-lg text-white hover:bg-[#383838]"
                >
                  <MdHomeFilled className="text-2xl mb-1" />
                  <span className="text-[10px]">Home</span>
                </Link>
              </li>
              <li className="mb-1">
                <div
                  className="flex flex-col items-center justify-center p-2 rounded-lg text-white hover:bg-[#383838]"
                >
                  <BsFire className="text-xl mb-1" />
                  <span className="text-[10px]">Shorts</span>
                </div>
              </li>
              <li className="mb-1">
                <div
                  className="flex flex-col items-center justify-center p-2 rounded-lg text-white hover:bg-[#383838]"
                >
                  <MdOutlineSubscriptions className="text-2xl mb-1" />
                  <span className="text-[10px]">Subs</span>
                </div>
              </li>
              <li className="mb-1">
                <div
                  className="flex flex-col items-center justify-center p-2 rounded-lg text-white hover:bg-[#383838]"
                >
                  <MdOutlineAccountCircle className="text-2xl mb-1" />
                  <span className="text-[10px]">You</span>
                </div>
              </li>
            </ul>
          </>
        )}
      </nav>
    </aside>
  );
};
export default Sidebar;