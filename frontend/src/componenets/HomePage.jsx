import React from 'react';
import Sidebar from './sidebar';  // Ensure filename matches import
import MsgContainer from './MsgContainer';

const HomePage = () => {
  return (
    <div className="flex h-full w-full  mx-auto shadow-2xl rounded-lg overflow-hidden bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-500">
      <div className="w-1/4 border-r bg-gray-900 backdrop-filter backdrop-blur-sm bg-opacity-5">
        <Sidebar />
      </div>
      <div className="w-3/4 bg-gray-900 backdrop-filter backdrop-blur-sm bg-opacity-5">
        <MsgContainer />
      </div>
    </div>
  );
};

export default HomePage;