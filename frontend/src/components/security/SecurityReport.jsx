import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axiosInstance from "../../utils/axiosInstance.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { 
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from "recharts";

const SecurityReport = () => {
  const [userStats, setUserStats] = useState({ total: 0, active: 0, inactive: 0 });
  const [visitorStats, setVisitorStats] = useState({ total: 0, active: 0, inactive: 0 });
  const [inmateStats, setInmateStats] = useState({ total: 6, active: 3, inactive: 3 });
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axiosInstance.get("/user/getAlluser");
        if (userResponse.data && userResponse.data.user) {
          const users = userResponse.data.user;
          const totalUsers = users.filter(user => user.role !== "visitor").length;
          const activeUsers = users.filter(user => user.role !== "visitor" && user.isactivated).length;
          const inactiveUsers = totalUsers - activeUsers;
          
          const visitors = users.filter(user => user.role === "visitor");
          const totalVisitors = visitors.length;
          const activeVisitors = visitors.filter(visitor => visitor.isactivated).length;
          const inactiveVisitors = totalVisitors - activeVisitors;
          
          setUserStats({ total: totalUsers, active: activeUsers, inactive: inactiveUsers });
          setVisitorStats({ total: totalVisitors, active: activeVisitors, inactive: inactiveVisitors });
        }
        
        const inmateResponse = await axiosInstance.get("/inmate/getAllInmates");
        if (inmateResponse.data && inmateResponse.data.inmates) {
          const inmates = inmateResponse.data.inmates;
          const totalInmates = inmates.length;
          const activeInmates = inmates.filter(inmate => inmate.isActive).length;
          const inactiveInmates = totalInmates - activeInmates;
          setInmateStats({ total: totalInmates, active: activeInmates, inactive: inactiveInmates });
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };
    fetchData();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Security Report", 14, 10);
    const tableColumn = ["Entity", "Total Count", "Active Count", "Inactive Count", "Action"];
    const tableRows = [
      ["System Users", userStats.total, userStats.active, userStats.inactive, "View Details"],
      ["Prison Visitors", visitorStats.total, visitorStats.active, visitorStats.inactive, "View Details"],
      ["Inmate Population", inmateStats.total, inmateStats.active, inmateStats.inactive, "View Details"],
    ];
    doc.autoTable({ head: [tableColumn], body: tableRows });
    doc.save("Security_Report.pdf");
  };

  const csvData = [
    ["Entity", "Total Count", "Active Count", "Inactive Count", "Action"],
    ["System Users", userStats.total, userStats.active, userStats.inactive, "View Details"],
    ["Prison Visitors", visitorStats.total, visitorStats.active, visitorStats.inactive, "View Details"],
    ["Inmate Population", inmateStats.total, inmateStats.active, inmateStats.inactive, "View Details"],
  ];

  const userPieData = [
    { name: "Active Users", value: userStats.active },
    { name: "Inactive Users", value: userStats.inactive },
    { name: "Active Visitors", value: visitorStats.active },
    { name: "Inactive Visitors", value: visitorStats.inactive },
  ];

  const inmateBarData = [
    { name: "Inmates", Active: inmateStats.active, Inactive: inmateStats.inactive }
  ];

  const COLORS = ["#0088FE", "#FFBB28", "#00C49F", "#FF8042"];

  return (
    <div className={`p-6 mt-12 transition-all duration-300 ${isCollapsed ? "ml-16" : "ml-64"}`}>
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="mb-4 flex items-center text-white bg-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <h3 className="text-2xl font-bold text-center mb-4">Security Overview Report</h3>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border px-4 py-2">Entity</th>
              <th className="border px-4 py-2">Total Count</th>
              <th className="border px-4 py-2">Active Count</th>
              <th className="border px-4 py-2">Inactive Count</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {["System Users", "Prison Visitors", "Inmate Population"].map((category, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{category}</td>
                <td className="border px-4 py-2">{[userStats, visitorStats, inmateStats][index].total}</td>
                <td className="border px-4 py-2">{[userStats, visitorStats, inmateStats][index].active}</td>
                <td className="border px-4 py-2">{[userStats, visitorStats, inmateStats][index].inactive}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => navigate(`/details/${category.replace(/\s+/g, "").toLowerCase()}`)} className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pie Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={userPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
            {userPieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend align="right" layout="vertical" verticalAlign="middle" />
        </PieChart>
      </ResponsiveContainer>

      {/* Bar Chart */}
      <BarChart width={500} height={300} data={inmateBarData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Active" fill="#0088FE" />
        <Bar dataKey="Inactive" fill="#FF8042" />
      </BarChart>
    </div>
  );
};

export default SecurityReport;
