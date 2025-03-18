
import React from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Admin/Navbar';
import { Outlet } from 'react-router-dom'; // Import Outlet
import CourtSidebar from '../components/CourtDashboard/CourtSidebar.';

const CourtDashboard = () => {
//   const { user, loading } = useAuth();
  const navigate = useNavigate();

//   if (loading) {
//     return <div>Loading.....</div>;
//   }

//   if (!user) {
//     navigate('/login');
//     return null; // Prevent further rendering
//   }

  return (
    <div className='flex'>
      <CourtSidebar />
      <div className='flex-1 justify-center h-screen bg-gray-100'>
        <Navbar />
        <Outlet /> {/* This will render the nested route */}
      </div>
    </div>
  );
};

export default CourtDashboard;