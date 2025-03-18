import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import { setIncident } from "../../redux/incidentSlice";
import { FaArrowLeft, FaSearch } from "react-icons/fa"; 

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#D2B48C",
      color: "#5A3E1B",
      fontWeight: "bold",
      fontSize: "14px",
      textTransform: "uppercase",
    },
  },
  rows: {
    style: {
      "&:hover": {
        backgroundColor: "#F5DEB3",
        cursor: "pointer",
        transition: "background-color 0.2s ease-in-out",
      },
    },
  },
};

import AddModal from "../Modals/AddModal";
import Add from "./Add";

const Incident = () => {
  const dispatch = useDispatch();
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const navigate = useNavigate();
  
  const [incidents, setIncidents] = useState([]);
  const [filteredIncidents, setFilteredIncidents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Fetch Incidents
  useEffect(() => {
    const getIncidents = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/incidents/allIncidents");
        if (response.data) {
          dispatch(setIncident(response.data.incidents));
          setIncidents(response.data.incidents);
          setFilteredIncidents(response.data.incidents);
        }
      } catch (error) {
        console.error("Error fetching incidents:", error);
      } finally {
        setLoading(false);
      }
    };
    getIncidents();
  }, [dispatch]);

  // Filter incidents by search query
  const filterByInput = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredIncidents(
      incidents.filter((incident) =>
        incident?.incidentId?.toLowerCase().includes(query)
      )
    );
  };

  // Filter functions for buttons
  const resetFilters = () => {
    setSearchQuery("");
    setFilteredIncidents(incidents);
  };

  const filterByButton = (status) => {
    setFilteredIncidents(
      incidents.filter(
        (incident) =>
          incident.status &&
          incident.status.toLowerCase() === status.toLowerCase()
      )
    );
  };

  // Define Table Columns using useMemo for performance optimization
  const columns = useMemo(
    () => [
      { name: "Incident ID", selector: (row) => row.incidentId, sortable: true },
      { name: "Reporter", selector: (row) => row.reporter, sortable: true },
      { name: "Type", selector: (row) => row.incidentType, sortable: true },
      { name: "Inmate", selector: (row) => row.inmate, sortable: true },
      { name: "Status", selector: (row) => row.status, sortable: true },
      {
        name: "Reported Date",
        selector: (row) => new Date(row.incidentDate).toLocaleDateString(),
        sortable: true,
      },
      {
        name: "Actions",
        cell: (row) => (
          <>
            <Link
              to={`/policeOfficer-dashboard/incident-details/${row._id}`}
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 mr-2"
            >
              View
            </Link>
            <Link
              to={`/policeOfficer-dashboard/edit-incident/${row._id}`}
              className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Edit
            </Link>
          </>
        ),
      },
    ],
    [incidents]
  );

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div
        className={`bg-white shadow-md p-4 fixed top-14 z-20 flex flex-wrap items-center justify-between transition-all duration-300 ml-2 gap-4 ${
          isCollapsed ? "left-16 w-[calc(100%-5rem)]" : "left-64 w-[calc(100%-17rem)]"
        }`}
      >
        {/* Back Button */}
        <button
          className="flex items-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md transition duration-300 mr-4"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="mr-2 text-lg" /> Back
        </button>
        
        <div className="flex-1" />
        
        {/* Search Input */}
        <div className="relative flex items-center w-72 md:w-1/3 mr-4">
          <FaSearch className="absolute left-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search by Incident ID"
            className="h-10 px-4 py-2 border border-gray-300 rounded-md w-full pl-10"
            value={searchQuery}
            onChange={filterByInput}
          />
        </div>
        
        {/* Add New Incident Button (Modal Trigger) */}
        <button
          onClick={() => setOpen(true)}
          className="h-10 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md flex items-center justify-center min-w-[150px] md:w-auto"
        >
          Add New Incident
        </button>
        <AddModal open={open} setOpen={setOpen}>
          <Add setOpen={setOpen} />
        </AddModal>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 relative min-h-screen mt-32">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Incident List</h2>
          
          {/* Filter Buttons placed above the table */}
          <div className="flex justify-end space-x-2 mb-4">
            <button
              className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              onClick={resetFilters}
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
              onClick={() => filterByButton("Resolved")}
            >
              Resolved
            </button>
            <button
              className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
              onClick={() => filterByButton("Escalated")}
            >
              Escalated
            </button>
          </div>
          
          {loading ? (
            <div className="text-center text-gray-600">Loading Incidents...</div>
          ) : (
            <div className="overflow-x-auto">
              <DataTable
                columns={columns}
                data={filteredIncidents}
                pagination
                customStyles={customStyles}
                highlightOnHover
                striped
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Incident;
