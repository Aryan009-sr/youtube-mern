import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ChannelPage = () => {
    const { channelId } = useParams(); // Get the channel ID from the URL
    const [channelData, setChannelData] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChannelData = async () => {
            try {
                setLoading(true);
                // Usesing channelId in the API call
                const res = await axios.get(`http://localhost:5000/api/channels/${channelId}`);
                setChannelData(res.data.channel); // Store the channel object
                setVideos(res.data.videos); // Extract the videos array
                setLoading(false);
            } catch (err) {
                setError('Channel not found or an error occurred.');
                setLoading(false);
            }
        };

        if (channelId) {
            fetchChannelData();
        }
    }, [channelId]);

    if (loading) {
        return <div className="text-white p-6">Loading channel...</div>;
    }

    if (error) {
        return <div className="p-6 text-red-500">{error}</div>;
    }

    if (!channelData) {
        return <div className="text-white p-6">Channel data is missing.</div>;
    }

    return (
        <div className="bg-[#121212] min-h-screen text-white">
            {/* Channel Banner */}
            {channelData.banner && (
                <div className="relative w-full h-40 sm:h-64 mt-10 bg-neutral-800">
                    <img
                        // src={channelData.banner || "/images/youtubeBanner-Hero.webp"}
                        src="/images/channelb.jpg"
                        alt="Channel Banner"
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Channel Profile Section */}
            <div className="flex items-center space-x-6 p-6">
                <img
                    // Instead of placeholder I have replaced this with local image
                    // src={channelData.profileImage || "/images/profile.jpg"}
                    src="/images/profile.jpg"
                    alt="Channel Profile"
                    className="w-32 h-32 rounded-full object-cover"
                />
                <div>
                    <h1 className="text-4xl font-bold">{channelData.name}</h1>
                    <p className="text-neutral-400 text-lg">@{channelData.handle}</p>
                    <p className="text-neutral-500 text-sm">
                        {channelData.subscribers} subscribers • {videos.length} videos
                    </p>
                    {/* <p className="text-neutral-400 text-sm mt-2">{channelData.description}</p> */}
                    <p className="text-neutral-400 text-sm mt-2">Welcome to my channel and its a dummy channel so kindly ignore the mistakes.</p>
                </div>
            </div>

            {/* Videos Section */}
            <div className="border-t border-neutral-700 pt-6 px-6">
                <h2 className="text-2xl font-bold mb-4">Videos</h2>
                {videos.length === 0 ? (
                    <p className="text-neutral-500">This channel has no videos yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {videos.map((video) => (
                            <div key={video._id} className="bg-neutral-800 rounded-lg overflow-hidden">
                                <img
                                    src={video.thumbnailUrl}
                                    alt={video.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold truncate">{video.title}</h3>
                                    <p className="text-neutral-500 text-sm mt-1">{video.views} views</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChannelPage;