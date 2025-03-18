import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/authContext";

export const columns = [
  {
    name: "U_No",
    selector: (row) => row.U_no,
    width: "70px",
  },
  {
    name: "FName",
    selector: (row) => row.firstName,
    sortable: true,
    width: "90px",
    center: true,
  },
  {
    name: "MName",
    selector: (row) => row.middleName,
    sortable: true,
    width: "90px",
    center: true,
  },
  {
    name: "LName",
    selector: (row) => row.lastName,
    sortable: true,
    width: "100px",
    center: true,
  },
  {
    name: "Status",
    selector: (row) => row.status ,
    width: "90px",
  },
  {
    name: "Email",
    selector: (row) => row.email,
    width: "140px",
    center: true,
  },
  {
    name: "Gender",
    selector: (row) => row.gender,
    sortable: true,
    width: "90px",
    center: true,
  },
  {
    name: "Role",
    selector: (row) => row.role,
    sortable: true,
    width: "100px",
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
        onClick={() => navigate(`/admin-dashboard/users/${_id}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-blue-600 rounded"
        onClick={() => navigate(`/admin-dashboard/edit/${_id}`)}
      >
        Edit
      </button>
    </div>
  );
};
