import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/authContext";

export const columns = [
  {
    name: "Ins No",
    selector: (row) => row.U_no,
    width: "100px",
  },
  {
    name: "Case No",
    selector: (row) => row.courtCaseNumber,
    sortable: true,
    width: "100px",
    center: true,
  },
  {
    name: "Judge Name",
    selector: (row) => row.judgeName,
    sortable: true,
    width: "100px",
    center: true,
  },
  
  {
    name: "Prison Name",
    selector: (row) => row.prisonName,
    sortable: true,
    width: "100px",
    center: true,
  },
  {
    name: "verdict",
    selector: (row) => row.verdict ,
    width: "90px",
  },
  {
    name: "instructions",
    selector: (row) => row.instructions,
    width: "120px",
    center: true,
  },
  {
    name: "Hearing Date",
    selector: (row) => row.hearingDate,
    sortable: true,
    width: "130px",
    center: true,
  },
  {
    name: "Effective Date",
    selector: (row) => row.effectiveDate,
    sortable: true,
    width: "130px",
    center: true,
  },
  
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
  },
];

export const fetchDepartment = async () => {
  try {
    const response = await axios.get(
      "https://employee-b-end.vercel.app/api/department",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      return response.data.departments;
    } else {
      alert("Failed to fetch departments");
      return [];
    }
  } catch (error) {
    console.error("Error fetching departments:", error);
    alert(
      error.response?.data?.error ||
        "An error occurred while fetching department details"
    );
    return [];
  }
};

export const getEmployees = async (id) => {
  console.log("Fetching employees for department ID:", id);
  if (!id || id.length !== 24) {
    console.error("Invalid department ID, request aborted:", id);
    return [];
  }

  try {
    const response = await axios.get(
      `https://employee-b-end.vercel.app/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      return response.data.employees;
    } else {
      alert("Failed to fetch employees");
      return [];
    }
  } catch (error) {
    console.error("Error fetching employees:", error);
    alert(
      error.response?.data?.error ||
        "An error occurred while fetching employee details"
    );
    return [];
  }
};
export const UserButtons = ({ _id }) => {
  const navigate = useNavigate();
//   const { user } = useAuth(); // Get logged-in user details

  return (
    <div className="flex space-x-3 text-white">
      <button
        className="px-3 py-1 bg-teal-600 rounded"
        onClick={() => navigate(`/court-dashboard/view/${_id}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-blue-600 rounded"
        onClick={() => navigate(`/court-dashboard/edit/${_id}`)}
      >
        Edit
      </button>
    </div>
  );
};
