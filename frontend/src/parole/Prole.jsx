import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axiosInstance from "../utils/axiosInstance";
import { columns, ParoleButtons } from "../utils/ParoleHelper";
import { useDispatch, useSelector } from "react-redux";

const Prole = () => {
  const [inmates, setInmates] = useState([]); // State for inmates data
  const [filteredInmates, setFilteredInmates] = useState([]); // Filtered inmates data
  const [loadingInmates, setLoadingInmates] = useState(false);

  // Get the collapsed state of the sidebar
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);

  // Fetch all inmates from the backend
  const fetchInmates = async () => {
    setLoadingInmates(true);
    try {
      const response = await axiosInstance.get("/inmates/allInmates");
      console.log('inmate data', response.data)

      if (response.data && response.data?.inmates) {
        let sno = 1;
        const formattedData = response.data.inmates.map((inmate) => ({
          _id: inmate._id,
          sno: sno++, // Auto-increment serial number
          inmate_name: inmate.fullName || "N/A",
          age: inmate.age || "N/A",
          gender: inmate.gender || "N/A",
          sentence: inmate.releaseReason || "N/A",
          action: <ParoleButtons _id={inmate._id} onDelete={fetchInmates} />,
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
      setLoadingInmates(false);
    }
  };

  useEffect(() => {
    fetchInmates();
  }, []);

  // Search and filter by inmate name
  const handleInmateSearch = (e) => {
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

  // Filter by parole status (Pending, Active, Revoked)
  const filterByButton = (status) => {
    const filtered = inmates.filter((inmate) => inmate.sentence === status);
    setFilteredInmates(filtered);
  };

  return (
    <div
      className={`p-6 mt-12 transition-all duration-300 ease-in-out ${
        isCollapsed ? "pl-16" : "pl-64" // Adjust padding based on sidebar state
      }`}
    >
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Manage Parole Applications</h2>
      </div>

      {/* Parole Search & Filter Controls */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search by inmate name"
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
            onChange={handleInmateSearch}
          />
        </div>

        <div className="space-x-3 w-full sm:w-auto flex justify-between sm:justify-start">
          <button
            className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 w-full sm:w-auto mb-2 sm:mb-0"
            onClick={() => setFilteredInmates(inmates)} // Reset to all
          >
            All
          </button>
          <button
            className="px-3 py-1 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 w-full sm:w-auto mb-2 sm:mb-0"
            onClick={() => filterByButton("Pending")}
          >
            Pending
          </button>
          <button
            className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 w-full sm:w-auto mb-2 sm:mb-0"
            onClick={() => filterByButton("Active")}
          >
            Active
          </button>
          <button
            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 w-full sm:w-auto mb-2 sm:mb-0"
            onClick={() => filterByButton("Revoked")}
          >
            Revoked
          </button>
        </div>
      </div>

      {/* Inmate List Table */}
      {loadingInmates ? (
        <div className="text-center text-gray-600">Loading inmates...</div>
      ) : (
        <div className="overflow-x-auto">
          <DataTable columns={columns} data={filteredInmates} pagination />
        </div>
      )}
    </div>
  );
};

export default Prole;
