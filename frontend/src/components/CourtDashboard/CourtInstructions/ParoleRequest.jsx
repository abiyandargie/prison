import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axiosInstance from "../../../utils/axiosInstance";
import { columns,ParoleRequestButtons } from "../../../utils/paroleRequest";

const ParoleRequest = () => {
  
  const [inmates, setInmates] = useState([]); // State for inmates data
  const [filteredInmates, setFilteredInmates] = useState([]); // Filtered inmates data
  const [loadingInmates, setLoadingInmates] = useState(false);

  // Fetch all inmates from the backend
  const fetchInmates = async () => {
    setLoadingInmates(true);
    try {
      const response = await axiosInstance.get("/inmates/allInmates");

      if (response.data && response.data?.inmates) {
        let sno = 1;
        const formattedData = response.data.inmates.map((inmate) => ({
          _id: inmate._id,
          sno: sno++, // Auto-increment serial number
          inmate_name: inmate.fullName || "N/A",
          age: inmate.age || "N/A",
          gender: inmate.gender || "N/A",
          sentence: inmate.releaseReason || "N/A",
          action: < ParoleRequestButtons _id={inmate._id} onDelete={fetchInmates} />,
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

  return (
    <div className="p-6 mt-12">
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Manage Parole Applications</h2>
      </div>

      {/* Parole Search & Filter Controls */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by inmate name"
          className="px-4 py-2 border border-gray-300 rounded-md w-1/3"
          onChange={handleInmateSearch}
        />

        <div className="space-x-3">
          <button
            className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            onClick={() => setFilteredLeaves(leaves)} // Reset to all
          >
            All
          </button>
          <button
            className="px-3 py-1 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
            onClick={() => filterByButton("Pending")}
          >
            Pending
          </button>
          <button
            className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
            onClick={() => filterByButton("Active")}
          >
            Active
          </button>
          <button
            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
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
        <DataTable columns={columns} data={filteredInmates} pagination />
      )}
    </div>
  );
};

export default ParoleRequest;
