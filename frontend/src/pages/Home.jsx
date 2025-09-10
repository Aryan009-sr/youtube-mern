import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoCard from '../components/VideoCard';
import FilterButtons from '../components/FilterButtons';

const Home = () => {
    const [videos, setVideos] = useState([]);
    const [displayedVideos, setDisplayedVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/videos');
                setVideos(response.data);
                setDisplayedVideos(response.data);
            } catch (err) {
                console.error("Error fetching videos:", err);
                setError("Failed to fetch videos. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    useEffect(() => {
        if (activeFilter === 'All') {
            setDisplayedVideos(videos);
        } else {
            const filtered = videos.filter(video =>
                Array.isArray(video.tags) &&
                video.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()))
            );
            setDisplayedVideos(filtered);
        }
    }, [activeFilter, videos]);

    if (loading) {
        return <div className="text-white text-center mt-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center mt-8">{error}</div>;
    }

    return (
        <div className="bg-[#121212] min-h-screen text-white p-4 sm:p-6 md:p-8">
            <FilterButtons activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 overflow-x-hidden ">
                {displayedVideos.length > 0 ? (
                    displayedVideos.map(video => (
                        <VideoCard key={video._id} video={video} />
                    ))
                ) : (
                    <div className="text-white text-center w-full col-span-full mt-8">
                        No videos found for this category.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;