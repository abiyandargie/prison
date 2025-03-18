
import React from 'react';
// import { useAuth } from '../context/authContext';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Admin/Navbar';
import SecurityStafSidebar from '../components/SecurityStaff/SecurityStafSidebar';
// import { useAuth } from '../context/authContext';

const SecurityStaffDashboard = () => {
  // const { user } =useAuth()

  return (
    <div className="flex">
      <SecurityStafSidebar />
      <div className="flex-1 justify-center h-screen bg-gray-100">
        <Navbar />
        <Outlet /> {/* This will render the nested route */}
      </div>
    </div>
  );
};

export default SecurityStaffDashboard;
