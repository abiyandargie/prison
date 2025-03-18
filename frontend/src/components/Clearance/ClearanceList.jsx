import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import InmateClearance from "./InmateClearance";
import AddModal from "../Modals/AddModal";
const ClearanceButtons = ({ _id, onDelete }) => {
 
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this clearance?")) {
      try {
        await axiosInstance.delete(`/clearance/delete/${_id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        onDelete();
      } catch (error) {
        console.error("Error deleting clearance:", error);
        alert("Failed to delete clearance.");
      }
    }
  };

  return (
    <div className="flex gap-2">
      <Link to={`/securityStaff-dashboard/edit-clearance/${_id}`} className="text-blue-500 hover:underline">Edit</Link>
      <button onClick={handleDelete} className="text-red-500 hover:underline">Delete</button>
    </div>
  );
};

const ClearancesList = () => {
  const [clearances, setClearances] = useState([]);
  const [filteredClearances, setFilteredClearances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open,setOpen]=useState(false);
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const navigate = useNavigate();

  const fetchClearances = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/clearance/getAllClearance", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data) {
        const formattedData = response.data.clearances.map((clearance) => ({
          _id: clearance._id,
          inmate: clearance.inmate || "N/A",
          reason: clearance.reason || "N/A",
          sign: clearance.sign || "Pending",
          date: new Date(clearance.date).toLocaleDateString(),
          remark: clearance.remark || "N/A",
          action: <ClearanceButtons _id={clearance._id} onDelete={fetchClearances} />,
        }));

        setClearances(formattedData);
        setFilteredClearances(formattedData);
      }
    } catch (error) {
      console.error("Error fetching clearances:", error);
      alert("Failed to fetch clearances.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClearances();
  }, []);

  const filterClearances = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = clearances.filter((clearance) =>
      clearance.inmate.toLowerCase().includes(query)
    );
    setFilteredClearances(filtered);
  };

  const columns = [
    { name: "Inmate Name", selector: (row) => row.inmate, sortable: true },
    { name: "Reason", selector: (row) => row.reason, sortable: true },
    { name: "Sign", selector: (row) => row.sign, sortable: true },
    { name: "Date", selector: (row) => row.date, sortable: true },
    { name: "Remark", selector: (row) => row.remark, sortable: true },
    { name: "Actions", selector: (row) => row.action, sortable: false },
  ];

  return (
    <div className={`p-5 mt-12 transition-all duration-300 ${isCollapsed ? "ml-16" : "ml-64"}`}>
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="mb-4 flex items-center text-white bg-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <h3 className="text-2xl font-bold text-center mb-5">Manage Clearances</h3>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by inmate name"
          className="px-4 py-2 border border-gray-300 rounded-md w-1/3"
          onChange={filterClearances}
        />
        <button
        onClick={()=>setOpen(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md"
        >
          Add New Clearance
        </button>
          <AddModal open={open} setOpen={setOpen}>
          <InmateClearance setOpen={setOpen} />
         </AddModal>
             
      </div>

      {loading ? (
        <div className="text-center text-gray-600">Loading clearances...</div>
      ) : (
        <DataTable columns={columns} data={filteredClearances} pagination />
      )}
    </div>
  );
};

export default ClearancesList;
