import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-[#121212] min-h-screen">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex pt-6 ">
        <Sidebar isOpen={isSidebarOpen} />
        <main
          className={`flex-grow p-7 transition-all duration-300 ${
            isSidebarOpen ? 'ml-56' : 'ml-16'
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;