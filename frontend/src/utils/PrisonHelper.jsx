import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "./axiosInstance";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "100px",
  },
  {
    name: "Prison Name",
    selector: (row) => row.prison_name, // Updated field for prison name
    width: "130px",
    sortable: true,
  },
  {
    name: "Location",
    selector: (row) => row.location || "N/A", // Added location column
    width: "100px",
    sortable: true,
  },
  {
    name: "Description",
    selector: (row) => row.description || "N/A", // Added capacity column
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const PrisonButtons = ({ _id, onDelete }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/prison/delete-prison/${id}`, // Updated API for prison
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data) {
        toast.success("Prison deleted successfully.");
        onDelete();
        setOpenDelete(false);
      } else {
        alert("Failed to delete the prison record.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.error || "Error deleting the prison.");
    }
  };

  return (
    <div className="flex space-x-3 text-white">
      <button
        className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
        onClick={() => navigate(`/inspector-dashboard/edit/${_id}`)}
      >
        Edit Prison
      </button>
      <button
        className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
        onClick={() => setOpenDelete(true)}
      >
        Delete Prison
      </button>
      <ConfirmModal
        open={openDelete}
        setOpen={setOpenDelete}
        onDelete={() => handleDelete(_id)}
        message="Do you really want to delete this prison? This action cannot be undone."
      />
    </div>
  );
};
