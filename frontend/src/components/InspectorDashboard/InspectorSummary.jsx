import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { FaLandmark, FaBullhorn, FaClipboardList } from "react-icons/fa";
import useNotices from "../../hooks/useNotice.jsx";  // 🛠️ Import the custom notice hook
import NoticeButton from "../../utils/noticeButtons.jsx"; // 🛠️ Import reusable notice button
import NoticeModal from "../modals/noticeModal.jsx"; // 🛠️ Import notice modal
import SummaryCard from "./Summary.jsx";

// Define colors for each data type
const COLORS = {
  prisons: "#1E3A8A", // Dark Blue
  noticesMonthly: "#EA580C", // Orange
  noticesToday: "#047857", // Green
};

const InspectorSummary = () => {
  const [summary, setSummary] = useState(null);
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // 🛠️ Use the custom hook to fetch and manage notices
  const { notices, isModalOpen, setIsModalOpen, markNoticeAsRead } = useNotices();

  useEffect(() => {
    const dummyData = {
      totalPrisons: 12,
      totalMonthlyNotices: 85,
      totalNoticesToday: 5,
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
    { name: "Total Prisons", value: summary.totalPrisons, color: COLORS.prisons },
    { name: "Total Notices (Monthly)", value: summary.totalMonthlyNotices, color: COLORS.noticesMonthly },
    { name: "Today's Notices", value: summary.totalNoticesToday, color: COLORS.noticesToday },
  ];

  return (
    <div className="flex">
      {/* Sidebar Spacing Fix */}
      <div className={`transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`} />

      {/* Main Content */}
      <div className="flex-1 relative">
        
        {/* Responsive Fixed Header */}
        <div
          className={`bg-white shadow-md p-4 fixed top-14 z-20 flex justify-between items-center transition-all duration-300 ml-2 ${
            isCollapsed ? "left-16 w-[calc(100%-5rem)]" : "left-64 w-[calc(100%-17rem)]"
          }`}
        >
          <h3 className="text-2xl font-bold text-gray-800 text-center">
            Inspector Dashboard Overview
          </h3>

          {/* 🛠️ Reusable Notice Button */}
          <NoticeButton notices={notices} onClick={() => setIsModalOpen(true)} />
        </div>

        {/* Push content down to prevent overlap */}
        <div className="p-6 mt-24">

          {/* Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <SummaryCard icon={<FaLandmark size={28} />} text="Total Prisons" number={summary.totalPrisons} color="bg-blue-700" />
            <SummaryCard icon={<FaBullhorn size={28} />} text="Total Notices (Monthly)" number={summary.totalMonthlyNotices} color="bg-orange-600" />
            <SummaryCard icon={<FaClipboardList size={28} />} text="Today's Notices" number={summary.totalNoticesToday} color="bg-green-700" />
          </div>

          {/* Pie Chart Summary with Responsive Legend */}
          <div className="mt-12 p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
            <h4 className="text-xl font-semibold text-gray-800 text-center mb-6">
              Summary Statistics
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

export default InspectorSummary;
