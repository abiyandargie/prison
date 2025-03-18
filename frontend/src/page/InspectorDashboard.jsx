
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Admin/Navbar';
import { Outlet } from 'react-router-dom'; // Import Outlet
import InspoectorSidebar from '../components/InspectorDashboard/InspectorSidebar';

const InspectorDashboard = () => {
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
      <InspoectorSidebar />
      <div className='flex-1 justify-center h-screen bg-gray-100'>
        <Navbar />
        <Outlet /> {/* This will render the nested route */}
      </div>
    </div>
  );
};

export default InspectorDashboard;