import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Helper function to format view count (reusing from VideoCard)
const formatViews = (views) => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M views`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(0)}K views`;
  }
  return `${views} views`;
};

// Helper function to format date (reusing from VideoCard)
const formatDate = (dateString) => {
  const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  return Math.floor(seconds) + ' seconds ago';
};

const RelatedVideoCard = ({ video }) => {
  const channelName = video.userId?.username || 'Unknown Channel';

  return (
    <Link to={`/video/${video._id}`}>
      <div className="flex space-x-3 cursor-pointer hover:bg-neutral-800 rounded-lg transition-colors p-2">
        {/* Thumbnail */}
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-40 h-24 object-cover rounded-lg flex-shrink-0"
        />

        {/* Video Details */}
        <div className="flex flex-col">
          <h3 className="text-white text-sm font-semibold line-clamp-2">{video.title}</h3>
          <p className="text-gray-400 text-xs mt-1">{channelName}</p>
          <p className="text-gray-400 text-xs mt-1">
            {formatViews(video.views)} • {formatDate(video.createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
};

RelatedVideoCard.propTypes = {
  video: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
    views: PropTypes.number,
    createdAt: PropTypes.string.isRequired,
    userId: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
};

export default RelatedVideoCard;