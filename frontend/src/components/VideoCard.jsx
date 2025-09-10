import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Helper function to format view count
const formatViews = (views) => {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M views`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(0)}K views`;
  return `${views} views`;
};

// Helper function to format upload date
const formatDate = (dateString) => {
  const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} months ago`;
  const years = Math.floor(months / 12);
  return `${years} years ago`;
};

const VideoCard = ({ video }) => {
  const channelId = video.userId?._id;
  const channelName = video.userId?.username || 'MyChannel';
  const profileImage = video.userId?.profileImage || '/images/profile.jpg';

  return (
    <div className="bg-neutral-900 rounded-lg overflow-hidden pb-4 cursor-pointer">
      <Link to={`/video/${video._id}`}>
        <div className="relative">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-40 object-cover"
          />
          {video.duration && (
            <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded-sm">
              {video.duration}
            </span>
          )}
        </div>
      </Link>

      <div className="flex items-start mt-3 px-3">
        <div className="flex-shrink-0 mr-3">
          {channelId ? (
            <Link to={`/channel/${channelId}`}>
              <img
                src={profileImage}
                alt={`${channelName} Avatar`}
                className="w-9 h-9 rounded-full"
              />
            </Link>
          ) : (
            <img
              src={profileImage}
              alt="Default Channel Avatar"
              className="w-9 h-9 rounded-full"
            />
          )}
        </div>

        <div className="flex-1">
          <Link to={`/video/${video._id}`}>
            <h2 className="text-white text-base font-semibold line-clamp-2">{video.title}</h2>
          </Link>
          {channelId ? (
            <Link to={`/channel/${channelId}`}>
              <p className="text-gray-400 text-sm mt-1 hover:text-white transition-colors">{channelName}</p>
            </Link>
          ) : (
            <p className="text-gray-400 text-sm mt-1">{channelName}</p>
          )}
          <p className="text-gray-400 text-sm">
            {formatViews(video.views)} • {formatDate(video.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

VideoCard.propTypes = {
  video: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
    duration: PropTypes.string,
    views: PropTypes.number.isRequired,
    uploadedAt: PropTypes.string.isRequired,
    userId: PropTypes.shape({
      _id: PropTypes.string,
      username: PropTypes.string,
      profileImage: PropTypes.string,
    }),
  }).isRequired,
};

export default React.memo(VideoCard);
