import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import DataTable from "react-data-table-component";
import { columns, InmateButtons } from "../../utils/InmateHelper";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { setInmate } from "../../redux/prisonSlice.js";

const InmatesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const [inmates, setInmates] = useState([]);
  const [filteredInmates, setFilteredInmates] = useState([]);
  const [loading, setLoading] = useState(false);
  const inmate = useSelector((state) => state.inmate.inmate);

  const fetchInmates = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/inmates/allInmates");

      if (response.data && response.data?.inmates) {
        dispatch(setInmate(response.data.inmates));
        let sno = 1;
        const formattedData = response.data.inmates.map((inmate) => ({
          _id: inmate._id,
          sno: sno++, // Auto-increment serial number
          inmate_name: inmate.fullName || "N/A",
          age: inmate.age || "N/A",
          gender: inmate.gender || "N/A",
          sentence: inmate.releaseReason || "N/A",
          action: <InmateButtons _id={inmate._id} onDelete={fetchInmates} />,
        }));

        setInmates(formattedData);
        setFilteredInmates(formattedData);
      } else {
        console.error("Invalid API response:", response);
      }
    } catch (error) {
      console.error("Error fetching inmates:", error);
      alert(error.response?.data?.error || "Failed to fetch inmate data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInmates();
  }, []);

  // Instant Search (Without Debounce)
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (!query) {
      setFilteredInmates(inmates);
      return;
    }
    const filtered = inmates.filter((inmate) =>
      inmate.inmate_name.toLowerCase().includes(query)
    );
    setFilteredInmates(filtered);
  };

  return (
    <div
      className={`p-6 mt-24 transition-all duration-300 ${
        isCollapsed ? "ml-16 w-[calc(100%-4rem)]" : "ml-64 w-[calc(100%-16rem)]"
      }`}
    >
      {/* Back Button */}
      <button
        className="flex items-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md transition duration-300"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="mr-2 text-lg" /> Back
      </button>

      <h3 className="text-3xl font-bold text-gray-800 text-center my-6">Manage Inmates</h3>

      {/* Search & Add Inmate Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by inmate name..."
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          onChange={handleSearch}
        />
        <Link
          to="/securityStaff-dashboard/add-inmate"
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition duration-300 text-center w-full md:w-auto"
        >
          + Add New Inmate
        </Link>
      </div>

      {/* Inmate List Table */}
      {loading ? (
        <div className="text-center text-gray-600">Loading inmates...</div>
      ) : (
        <div className="overflow-x-auto bg-white p-5 rounded-lg shadow-md">
          <DataTable columns={columns} data={filteredInmates} pagination />
        </div>
      )}
    </div>
  );
};

export default InmatesList;
