import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import { columns, PrisonButtons } from "../../utils/PrisonHelper";
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

const PrisonsList = () => {
  const [prisons, setPrisons] = useState([]);
  const [filteredPrisons, setFilteredPrisons] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchPrisons = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/prison/getall-prisons");
        if (response.data) {
          const formattedData = response.data.prisons.map((prison) => ({
            _id: prison._id,
            prison_name: prison.prison_name || "N/A",
            location: prison.location || "N/A",
            description: prison.description || "N/A",
            action: <PrisonButtons _id={prison._id} onDelete={fetchPrisons} />, 
          }));
          setPrisons(formattedData);
          setFilteredPrisons(formattedData);
        }
      } catch (error) {
        console.error("Error fetching prisons:", error);
        alert("Failed to fetch prison data.");
      } finally {
        setLoading(false);
      }
    };
    fetchPrisons();
  }, []);

  const filterPrisons = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = prisons.filter((prison) =>
      prison.prison_name.toLowerCase().includes(query)
    );
    setFilteredPrisons(filtered);
  };

  return (
    <div className="flex">
      <div className={`transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`} />
      <div className="flex-1 relative min-h-screen">
        <div
          className={`bg-white shadow-md p-4 fixed top-14 z-20 flex flex-wrap items-center justify-between transition-all duration-300 ml-2 gap-4 ${
            isCollapsed ? "left-16 w-[calc(100%-5rem)]" : "left-64 w-[calc(100%-17rem)]"
          }`}
        >
          <button
            className="flex items-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md transition duration-300 mr-4"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="mr-2 text-lg" /> Back
          </button>
          <div className="flex-1" />
          <div className="relative flex items-center w-72 md:w-1/3 mr-4">
            <FaSearch className="absolute left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search by prison name"
              className="h-10 px-4 py-2 border border-gray-300 rounded-md w-full pl-10"
              onChange={filterPrisons}
            />
          </div>
          <Link
            to="/inspector-dashboard/add-prison"
            className="h-10 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md flex items-center justify-center min-w-[150px] md:w-auto"
          >
            Add New Prison
          </Link>
        </div>
        <div className="p-6 mt-32">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Prison List</h2>
          {loading ? (
            <div className="text-center text-gray-600">Loading Prisons...</div>
          ) : (
            <div className="overflow-x-auto">
              <DataTable
                columns={columns}
                data={filteredPrisons}
                pagination
                className="shadow-lg rounded-lg overflow-hidden"
                customStyles={customStyles}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrisonsList;
