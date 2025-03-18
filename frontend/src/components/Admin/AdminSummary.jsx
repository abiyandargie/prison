import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaRegTimesCircle,
  FaUsers,
  FaMapMarkedAlt,
  FaGlobeAfrica,
  FaUserShield,
  FaUserTie,
} from "react-icons/fa";
import SummaryCard from "./SummaryCard.jsx";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance"; // Import axiosInstance

const AdminSummary = () => {
  const [notice, setNotice] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const users = useSelector((state) => state.users.users);
  const police = users.filter((user) => user.role === "police-officer");
  const activeUsers = users.filter((user) => user.isactivated === true);
  const deactivatedUsers = users.filter((user) => user.isactivated === false); // Fix spelling

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch notices
        const noticeResponse = await axiosInstance.get("/notice/getAllNotices");
        if (noticeResponse.data) {
          setNotice(noticeResponse.data.notices);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="p-6 mt-12">
      {/* Notices Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-6">Notices</h3>
        {notice > 0 ? (
          notice.map((noticeItem, index) => {
            // Check if the notice is posted and "Admin" is in the roles array
            if (noticeItem.isPosted && noticeItem.roles.includes("Admin")) {
              return (
                <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
                  <p className="text-lg font-semibold">{noticeItem.title}</p>
                  <p className="text-sm text-gray-600">{noticeItem.description}</p>
                  <p className="text-sm text-gray-500">Priority: {noticeItem.priority}</p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(noticeItem.date).toLocaleDateString()}
                  </p>
                </div>
              );
            }
            return null; // Skip notices that don't match the condition
          })
        ) : (
          <p>No notices available.</p> // Show message if no notices
        )}
      </div>

      {/* Dashboard Overview */}
      <h3 className="text-2xl font-bold">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard
          icon={<FaUsers />}
          text="Total Users"
          number={users.length}
          color="bg-teal-600"
        />
        <SummaryCard
          icon={<FaMapMarkedAlt />}
          text="Total Zone Accounts"
          number={40} // Replace with dynamic value if available
          color="bg-yellow-600"
        />
        <SummaryCard
          icon={<FaGlobeAfrica />}
          text="Total Woreda Accounts"
          number={100} // Replace with dynamic value if available
          color="bg-blue-600"
        />
        <SummaryCard
          icon={<FaUserShield />}
          text="Total Zone Police Officers"
          number={police.length}
          color="bg-purple-600"
        />
        <SummaryCard
          icon={<FaUserTie />}
          text="Total Woreda Police Officers"
          number={100} // Replace with dynamic value if available
          color="bg-indigo-600"
        />
      </div>

      {/* Account Details */}
      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Account Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCard
            icon={<FaFileAlt />}
            text="Active Accounts"
            number={activeUsers.length}
            color="bg-teal-600"
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text="Blocked Accounts"
            number={20} // Replace with dynamic value if available
            color="bg-green-600"
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text="Restricted Accounts"
            number={deactivatedUsers.length} // Use corrected variable name
            color="bg-yellow-600"
          />
          <SummaryCard
            icon={<FaRegTimesCircle />}
            text="Deleted Accounts"
            number={30} // Replace with dynamic value if available
            color="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;