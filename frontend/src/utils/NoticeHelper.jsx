

export const columns = [
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
  },
 
  {
    name: "Roles",
    selector: (row) => (Array.isArray(row.roles) ? row.roles.join(", ") : row.roles),
  },
  {
    name: "Priority",
    width:"100px",
    selector: (row) => row.priority,
    sortable: true,
    cell: (row) => (
      <span
        className={`px-2 py-1 rounded-md text-white ${
          row.priority === "Urgent"
            ? "bg-red-600"
            : row.priority === "High"
            ? "bg-orange-500"
            : row.priority === "Normal"
            ? "bg-blue-500"
            : "bg-gray-400"
        }`}
      >
        {row.priority}
      </span>
    ),
  },
  {
    name: "Date",
    width:"100px",
    selector: (row) => new Date(row.date).toLocaleDateString(),
    sortable: true,
  },
 
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

  
  import React from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "./axiosInstance";

export const NoticeButtons = ({ _id, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notice?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axiosInstance.delete(
        `/notice/delete-notice/${id}`, // Adjusted endpoint for notices
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data) {
        alert("Notice deleted successfully.");
        onDelete();
      } else {
        alert("Failed to delete the notice.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.error || "Error deleting the notice.");
    }
  };

  return (
    <div className="flex space-x-3 text-white">
      <button
        className="px-3 py-1 bg-green-600 rounded hover:bg-green-700"
        onClick={() => navigate(`/Inspector-dashboard/view-notice/${_id}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
        onClick={() => navigate(`/Inspector-dashboard/update-notice/${_id}`)}
      >
        Edit
      </button>
     
    </div>
  );
};