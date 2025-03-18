import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, UserButtons } from "../../utils/UserHelper.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import { useSelector } from "react-redux";
import AddModal from "../Modals/AddModal.jsx";
import AddUser from "./Add.jsx";

const List = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/user/getAlluser");

        if (response.data && response.data.user) {
          let Uno = 1;

          const data = response.data.user.map((user) => ({
            U_no: Uno++,
            _id: user._id,
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            email: user.email,
            gender: user.gender,
            role: user.role,
            status: user.isactivated ? "Active" : "Denied",
            action: <UserButtons _id={user._id} />,
          }));

          setUsers(data);
          setFilteredUsers(data);
        } else {
          console.error("Unexpected data format:", response.data.user);
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        alert(error.response?.data?.error || "Failed to load users.");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleFilter = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(query) ||
        user.middleName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  return (
    <div
      className={`p-4 md:p-6 mt-12 transition-all duration-300 ${
        isCollapsed ? "ml-16" : "ml-64"
      }`}
    >
      {/* Title */}
      <div className="text-center mb-4">
        <h3 className="text-xl md:text-2xl font-bold">Manage Users</h3>
      </div>

      {/* Search & Add Button (Responsive) */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 mb-4">
        <input
          type="text"
          onChange={handleFilter}
          placeholder="Search users..."
          className="px-3 py-2 border rounded-md w-full sm:w-64 text-sm"
        />
        <button
          className="px-3 py-2 bg-teal-600 text-white rounded-md text-center w-full sm:w-auto text-sm"
          onClick={() => setOpen(true)}
        >
          Add New User
        </button>
        <AddModal open={open} setOpen={setOpen}>
          <AddUser setOpen={setOpen} />
        </AddModal>
      </div>

      {/* Data Table */}
      <div className="mt-6 bg-white p-4 rounded shadow-md overflow-x-auto">
        <DataTable
          columns={columns}
          data={filteredUsers}
          pagination
          progressPending={loading}
          progressComponent={<p className="text-center">Loading...</p>}
          responsive
        />
      </div>
    </div>
  );
};

export default List;
