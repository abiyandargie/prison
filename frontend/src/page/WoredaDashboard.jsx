import React from 'react';
// import { useAuth } from '../context/authContext';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Admin/Navbar';
import WoredaSidebar from '../components/Woreda/WoredaSidebar';
// import { useAuth } from '../context/authContext';

const WoredaDashboard = () => {
  // const { user } =useAuth()

  return (
    <div className="flex">
      <WoredaSidebar />
      <div className="flex-1 ml-64 justify-center h-screen bg-gray-100">
        <Navbar />
        <Outlet /> 
      </div>
    </div>
  );
};

export default WoredaDashboard;
