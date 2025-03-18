import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axiosInstance from "../../utils/axiosInstance.js";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredVisitors, setFilteredVisitors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCount, setActiveCount] = useState(0);
  const [deactivatedCount, setDeactivatedCount] = useState(0);
  const [activeVisitors, setActiveVisitors] = useState(0);
  const [deactivatedVisitors, setDeactivatedVisitors] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/user/getAlluser");
        if (response.data && response.data.user) {
          let userNo = 1;
          let visitorNo = 1;

          // Process Non-Visitor Users
          const usersData = response.data.user
            .filter(user => user.role !== "visitor")
            .map(user => ({
              U_no: userNo++, // Increment user number
              _id: user._id,
              firstName: user.firstName,
              middleName: user.middleName,
              lastName: user.lastName,
              email: user.email,
              gender: user.gender,
              role: user.role,
              status: user.isactivated ? "Active" : "Deactivated",
            }));

          // Process Visitor Users
          const visitorsData = response.data.user
            .filter(user => user.role === "visitor")
            .map(user => ({
              V_no: visitorNo++, // Increment visitor number
              _id: user._id,
              firstName: user.firstName,
              middleName: user.middleName,
              lastName: user.lastName,
              email: user.email,
              gender: user.gender,
              role: user.role,
              status: user.isactivated ? "Active" : "Deactivated",
            }));

          setUsers(usersData);
          setVisitors(visitorsData);
          setFilteredUsers(usersData);
          setFilteredVisitors(visitorsData);

          setActiveCount(usersData.filter(user => user.status === "Active").length);
          setDeactivatedCount(usersData.filter(user => user.status === "Deactivated").length);
          setActiveVisitors(visitorsData.filter(user => user.status === "Active").length);
          setDeactivatedVisitors(visitorsData.filter(user => user.status === "Deactivated").length);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleFilterUsers = (e) => {
    const query = e.target.value.toLowerCase();
    setFilteredUsers(users.filter(user => user.firstName.toLowerCase().includes(query)));
  };

  const handleFilterVisitors = (e) => {
    const query = e.target.value.toLowerCase();
    setFilteredVisitors(visitors.filter(visitor => visitor.firstName.toLowerCase().includes(query)));
  };

  const generatePDF = (data, title,active, deactivated ) => {
    const doc = new jsPDF();
    doc.text(title, 14, 10);
    
    const tableColumn = ["No", "First Name", "Middle Name", "Last Name", "Email", "Gender", "Role", "Status"];
    const tableRows = data.map(user => [
      user.U_no || user.V_no, 
      user.firstName,
      user.middleName,
      user.lastName,
      user.email,
      user.gender,
      user.role,
      user.status,
    ]);
  
    doc.autoTable({ head: [tableColumn], body: tableRows });
  
    // Add counts at the bottom of the PDF
    doc.text(`Total Active: ${activeCount}`, 14, doc.autoTable.previous.finalY + 10);
    doc.text(`Total Deactivated: ${deactivatedCount}`, 14, doc.autoTable.previous.finalY + 20);
  
    doc.save(`${title}.pdf`);
  };
  

  const columns = [
    { name: "No", selector: row => row.U_no || row.V_no, sortable: true },
    { name: "First Name", selector: row => row.firstName, sortable: true },
    { name: "Middle Name", selector: row => row.middleName, sortable: true },
    { name: "Last Name", selector: row => row.lastName, sortable: true },
    { name: "Email", selector: row => row.email, sortable: true },
    { name: "Gender", selector: row => row.gender, sortable: true },
    { name: "Role", selector: row => row.role, sortable: true },
    { name: "Status", selector: row => row.status, sortable: true },
  ];

  return (
    <div className="p-6 mt-12">
      <h3 className="text-2xl font-bold text-center mb-4">User Account Reports</h3>

      {/* User Accounts */}
      {/* <div className="flex justify-between mb-4">
        <input type="text" placeholder="Search users by first name" className="px-4 py-2 border rounded-md" onChange={handleFilterUsers} />
        <Link to="/admin-dashboard/add-user" className="px-4 py-2 bg-teal-600 text-white rounded-md">Add New User</Link>
      </div> */}

      <div className="mb-4">
        <button className="px-4 py-2 bg-green-600 text-white rounded-md mr-2">Active Users: {activeCount}</button>
        <button className="px-4 py-2 bg-red-600 text-white rounded-md">Deactivated Users: {deactivatedCount}</button>
      </div>

      <div className="flex space-x-4 mb-4">
        <CSVLink data={filteredUsers} filename="User_Report.csv" className="px-4 py-2 bg-purple-600 text-white rounded-md">Export Users CSV</CSVLink>
        <button className="px-4 py-2 bg-red-600 text-white rounded-md" onClick={() => generatePDF(filteredUsers, "User Report")}>Export Users PDF</button>
      </div>

      <DataTable columns={columns} data={filteredUsers} pagination progressPending={loading} />

      {/* Visitor Accounts */}
      <h3 className="text-xl font-bold mt-8">Visitor Account </h3>
      <div className="flex justify-between mb-4">
        <input type="text" placeholder="Search visitors by first name" className="px-4 py-2 border rounded-md" onChange={handleFilterVisitors} />
      </div>

      <div className="mb-4">
        <button className="px-4 py-2 bg-green-600 text-white rounded-md mr-2">Active Visitors: {activeVisitors}</button>
        <button className="px-4 py-2 bg-red-600 text-white rounded-md">Deactivated Visitors: {deactivatedVisitors}</button>
      </div>

      <div className="flex space-x-4 mb-4">
        <CSVLink data={filteredVisitors} filename="Visitor_Report.csv" className="px-4 py-2 bg-purple-600 text-white rounded-md">Export Visitors CSV</CSVLink>
        <button className="px-4 py-2 bg-red-600 text-white rounded-md" onClick={() => generatePDF(filteredVisitors, "Visitor Report")}>Export Visitors PDF</button>
      </div>

      <DataTable columns={columns} data={filteredVisitors} pagination progressPending={loading} />
    </div>
  );
};

export default UserList;
