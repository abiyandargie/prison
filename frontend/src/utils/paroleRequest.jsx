// InmateHelper.jsx
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
    
  },
  {
    name: "Inmate Name",
    selector: (row) => row.inmate_name, // Adjust field based on your API response
    sortable: true,
  },
  {
    name: "Age",
    selector: (row) => row.age || "N/A",
    sortable: true,
    width: "70px",
  },
  {
    name: "Gender",
    selector: (row) => row.gender || "N/A",
    sortable: true,
    width: "90px",
  },
  {
    name: "Sentence",
    selector: (row) => row.sentence || "N/A",
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const ParoleRequestButtons = ({ _id }) => {
  const navigate = useNavigate();

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this inmate record?"
//     );
//     if (!confirmDelete) return;

//     try {
//       const response = await axios.delete(
//         `https://localhost:5000/api/inmate/${id}`, // Updated API endpoint for inmate
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         alert("Inmate record deleted successfully.");
//         onDelete();
//       } else {
//         alert("Failed to delete the inmate record.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert(error.response?.data?.error || "Error deleting the inmate record.");
//     }
//   };

  return (
    <div className="flex space-x-3 text-white">
      <button
        className="px-3 py-1 bg-green-600 rounded hover:bg-green-700"
        onClick={() => navigate(`/court-dashboard/view-request/${_id}`)}
      >
        View
      </button>
      {/* <button
        className="px-3 py-1 bg-green-600 rounded hover:bg-green-700"
        onClick={() => navigate(`/policeOfficer-dashboard/status/${_id}`)}
      >
       Parole Status
      </button> */}
   
    </div>
  );
};




