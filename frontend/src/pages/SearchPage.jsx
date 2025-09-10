import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import VideoCard from '../components/VideoCard';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/videos/search?q=${encodeURIComponent(query)}`
        );
        setResults(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError(err.response?.data?.msg || 'Failed to fetch search results.');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) return <div className="text-white text-center mt-8">Loading...</div>;

  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  if (!query) return <div className="text-white text-center mt-8">Please enter a search query.</div>;

  if (results.length === 0)
    return (
      <div className="text-gray-400 text-center mt-8">
        No results found for <span className="text-white font-semibold">"{query}"</span>.
      </div>
    );

  return (
    <div className="bg-[#121212] min-h-screen text-white p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-4">Search results for "{query}"</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};
export default SearchPage;