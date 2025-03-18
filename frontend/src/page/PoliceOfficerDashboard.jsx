import React from 'react';
// import { useAuth } from '../context/authContext';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Admin/Navbar';
import PoliceOfficcerSidebar from '../components/PoliceOfficerDashboard/PoliceOfficcerSidebar';
// import { useAuth } from '../context/authContext';

const PoliceOfficerDashboard = () => {
  // const { user } =useAuth()

  return (
    <div className="flex">
      <PoliceOfficcerSidebar />
      <div className="flex-1 justify-center h-screen bg-gray-100">
        <Navbar />
        <Outlet /> {/* This will render the nested route */}
      </div>
    </div>
  );
};

export default PoliceOfficerDashboard;
