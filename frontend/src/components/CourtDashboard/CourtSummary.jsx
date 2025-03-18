import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance.js";
import { 
  FaUserTie, 
  FaHourglassHalf, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaGavel 
} from "react-icons/fa";
import SummaryCard from "./Summary.jsx";  // Make sure this path is correct

const CourtSummary = () => {
  const [summary, setSummary] = useState(null);
  const [notice, setNotice] = useState([]);
 
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
      const dummyData = {
        totalParolees: 120,
        pendingParolees: 85,
        activeParolees: 30,
        revokedParolees: 5,
      };
  
      // Simulate async data fetching
      setTimeout(() => {
        setSummary(dummyData);
      }, 500);
      fetchData();
    }, []);
   



  if (!summary) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600">
        <span className="animate-pulse">Loading data...</span>
      </div>
    );
  }

  return (
    <div className="p-6 mt-12 text-center">
   <div className="mb-12">
        <h3 className="text-2xl font-bold mb-6">Notices</h3>
        {notice.length > 0 ? (
          notice.map((noticeItem, index) => {
            // Check if the notice is posted and "Admin" is in the roles array
            if (noticeItem.isPosted && noticeItem.roles.includes("Court")) {
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

      <h3 className="flex items-center text-2xl font-bold text-gray-800">
        <FaGavel className="mr-2" /> Court Dashboard Overview
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <SummaryCard
          icon={<FaUserTie size={28} />}
          text="Total Parolees"
          number={summary.totalParolees}
          color="bg-blue-700"
        />
        <SummaryCard
          icon={<FaHourglassHalf size={28} />}
          text="Pending Parolees"
          number={summary.pendingParolees}
          color="bg-orange-600"
        />
        <SummaryCard
          icon={<FaCheckCircle size={28} />}
          text="Active Parolees"
          number={summary.activeParolees}
          color="bg-green-700"
        />
        <SummaryCard
          icon={<FaTimesCircle size={28} />}
          text="Revoked Parolees"
          number={summary.revokedParolees}
          color="bg-red-700"
        />
      </div>
    </div>
  );
};

export default CourtSummary;
