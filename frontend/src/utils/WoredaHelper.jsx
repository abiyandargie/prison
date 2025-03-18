import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
  {
    name: "S No",
    selector: (row) => row. U_no,
    width: "100px",
  },
  {
    name: "First Name",
    selector: (row) => row.firstName,
    width: "130px",
    sortable: true,
  },
  {
    name: "Middle Name",
    selector: (row) => row.middleName || "N/A", 
    width: "100px",
    sortable: true,
  },
  {
    name: "from Prison",
    selector: (row) => row.fromPrison || "N/A", 
    sortable: true,
  },
  {
    name: "to Prison",
    selector: (row) => row.toPrison || "N/A",
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.status || "N/A",
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const TransferButtons = ({ _id, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this prison record?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `https://localhost:5000/api/prison/${id}`, // Updated API for prison
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        alert("Prison deleted successfully.");
        onDelete();
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
        className="px-3 py-1 bg-green-600 rounded hover:bg-red-700"
        onClick={() => navigate(`/securityStaff-dashboard/woreda-view/${_id}`)}
      >
        View
      </button>
      {/* <button
        className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
        onClick={() => navigate(`/woreda-dashboard/edit/${_id}`)}
      >
        Edit 
      </button> */}
      {/* <button
        className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
        onClick={() => handleDelete(_id)}
      >
        Delete Prison
      </button> */}
    </div>
  );
};
