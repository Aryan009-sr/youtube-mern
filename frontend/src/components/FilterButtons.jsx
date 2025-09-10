import React from 'react';

const FilterButtons = ({ activeFilter, setActiveFilter }) => {
  const filters = ['All', 'Music', 'Gaming', 'Mixes', 'React', 'Live', 'Tutorials', 'Programming', 'Comedy'];

  return (
    <div className="sticky top-17 z-20 bg-[#121212] p-4 no-scrollbar border-b border-gray-800">
      <div className="flex items-center space-x-2 flex-wrap sm:space-x-4">
        {filters.map((filter, index) => (
          <button
            key={index}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
              activeFilter === filter ? 'bg-white text-black' : 'bg-[#303030] text-white hover:bg-[#4a4a4a]'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterButtons;