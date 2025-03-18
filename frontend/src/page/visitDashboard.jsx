import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Admin/Navbar';
import VisitorSidebar from '../components/visitorDashboaard/VisitorSidebar';

const visitDashboard = () => {
  return (
    <div className="flex">
      <VisitorSidebar />
      <div className="flex-1 justify-center h-screen bg-gray-100">
        <Navbar />
        <Outlet /> {/* This will render the nested route */}
      </div>
    </div>
  );
};

export default visitDashboard;
