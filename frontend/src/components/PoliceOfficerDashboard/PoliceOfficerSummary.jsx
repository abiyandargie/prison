import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaShieldAlt, FaExclamationTriangle, FaUsers } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import useNotices from "../../hooks/useNotice.jsx";
import NoticeButton from "../../utils/noticeButtons.jsx";
import NoticeModal from "../modals/noticeModal.jsx"; // 🛠️ Import notice modal
import SummaryCard from "./Summary.jsx";

const COLORS = {
  pending: "#F59E0B", // Orange
  resolved: "#10B981", // Green
  escalated: "#EF4444", // Red
  underInvestigation: "#14B8A6", // Teal
};

const PoliceOfficerSummary = () => {
  const [summary, setSummary] = useState(null);
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { notices, isModalOpen, setIsModalOpen, markNoticeAsRead } = useNotices();

  useEffect(() => {
    const dummyData = {
      totalCases: 120,
      totalIncidents: 85,
      totalOfficers: 50,
      caseSummary: {
        pending: 30,
        resolved: 70,
        escalated: 10,
        underInvestigation: 10,
      },
    };
    setTimeout(() => {
      setSummary(dummyData);
    }, 500);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!summary) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600">
        <span className="animate-pulse">Loading data...</span>
      </div>
    );
  }

  const chartData = [
    { name: "Pending", value: summary.caseSummary.pending, color: COLORS.pending },
    { name: "Resolved", value: summary.caseSummary.resolved, color: COLORS.resolved },
    { name: "Escalated", value: summary.caseSummary.escalated, color: COLORS.escalated },
    { name: "Under Investigation", value: summary.caseSummary.underInvestigation, color: COLORS.underInvestigation },
  ];

  return (
    <div className="flex">
      {/* Sidebar Spacing Fix */}
      <div className={`transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`} />

      {/* Main Content */}
      <div className="flex-1 relative">
        
        {/* Fixed Header */}
        <div
          className={`bg-white shadow-md p-4 fixed top-12 z-20 flex justify-between items-center transition-all duration-300 ml-2 ${isCollapsed ? "left-16 w-[calc(100%-5rem)]" : "left-64 w-[calc(100%-17rem)]"}`}
          style={{ zIndex: 20 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 text-center">
            Police Officer Dashboard Overview
          </h3>

          {/* 🛠️ Reusable Notice Button */}
          <NoticeButton notices={notices} onClick={() => setIsModalOpen(true)} />
        </div>

        {/* Push content down to prevent overlap */}
        <div className="p-6 mt-20"> {/* Adjusted margin top to avoid overlap with the header */}
          {/* Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <SummaryCard icon={<FaShieldAlt size={28} />} text="Total Cases" number={summary.totalCases} color="bg-blue-700" />
            <SummaryCard icon={<FaExclamationTriangle size={28} />} text="Total Incidents" number={summary.totalIncidents} color="bg-orange-600" />
            <SummaryCard icon={<FaUsers size={28} />} text="Total Officers" number={summary.totalOfficers} color="bg-green-700" />
          </div>

          {/* Pie Chart Summary with Responsive Legend */}
          <div className="mt-12 p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
            <h4 className="text-xl font-semibold text-gray-800 text-center mb-6">
              Case Status Breakdown
            </h4>

            {/* Ensure proper width and height for the pie chart */}
            <div className="w-full max-w-4xl flex justify-center">
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx={isMobile ? "50%" : "30%"}
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${entry.name}-${index}`} fill={entry.color} />
                    ))}
                  </Pie>

                  <Tooltip />

                  <Legend
                    layout={isMobile ? "horizontal" : "vertical"}
                    align={isMobile ? "center" : "right"}
                    verticalAlign={isMobile ? "bottom" : "middle"}
                    wrapperStyle={isMobile ? { marginTop: "20px" } : {}}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* 🛠️ Reusable Notice Modal */}
      <NoticeModal
        notices={notices}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectNotice={markNoticeAsRead}
        selectedNotice={null}
      />
    </div>
  );
};

export default PoliceOfficerSummary;
