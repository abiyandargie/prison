import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance.js";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { columns as defaultColumns } from "../../utils/VisitorHelper.jsx"; // Ensure this is correctly defined
import UpdateVisitorModal from "../Modals/UpdateVisitorModal";  // Modal for updating visitor
import ViewVisitorModal from "../Modals/ViewVisitorModal";      // Modal for viewing visitor
import AddModal from "../Modals/AddModal.jsx";    
import RegisterVisitor from '../../components/Visitor/RegisterVisitor.jsx'

// Custom styles for the table
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

const List = () => {
  const [visitors, setVisitors] = useState([]);
  const [filteredVisitors, setFilteredVisitors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [viewVisitor, setViewVisitor] = useState(null);
  const [open, setOpen] = useState(false); // <-- Added state for modal open status
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);

  // Fetch visitors data on component mount
  useEffect(() => {
    const fetchVisitors = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/visitor/allVisitors");

        if (response.data && response.data.visitors) {
          const formattedData = response.data.visitors.map((visitor) => ({
            ...visitor,
            action: (
              <div className="flex gap-2">
                <button
                  onClick={() => setViewVisitor(visitor)} // Open view modal
                  className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg shadow-md transition duration-300"
                >
                  View
                </button>

                <button
                  onClick={() => setSelectedVisitor(visitor)} // Open update modal
                  className="text-white bg-teal-600 hover:bg-teal-700 px-3 py-1 rounded-lg shadow-md transition duration-300"
                >
                  Edit
                </button>
              </div>
            ),
          }));

          setVisitors(formattedData);
          setFilteredVisitors(formattedData); // Set filtered visitors to all visitors initially
        } else {
          console.error("Unexpected API response format:", response.data);
          alert("Invalid response format from server.");
        }
      } catch (error) {
        console.error("Error fetching visitors:", error);
        alert("Failed to fetch visitors.");
      } finally {
        setLoading(false);
      }
    };

    fetchVisitors();
  }, []);

  // Filter visitors based on search query
  const filterVisitors = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = visitors.filter((visitor) =>
      visitor.firstName.toLowerCase().includes(query) ||
      visitor.middleName.toLowerCase().includes(query) ||
      visitor.lastName.toLowerCase().includes(query)
    );
    setFilteredVisitors(filtered); // Update filtered visitors state
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`} />
      
      {/* Main Content */}
      <div className="flex-1 relative min-h-screen">
        <div
          className={`bg-white shadow-md p-4 fixed top-14 z-20 flex flex-wrap items-center justify-between transition-all duration-300 ml-2 gap-2 ${
            isCollapsed ? "left-16 w-[calc(100%-5rem)]" : "left-64 w-[calc(100%-17rem)]"
          }`}
        >
          {/* Back Button */}
          <button
            className="flex items-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md transition duration-300"
            onClick={() => window.history.back()}
          >
            <FaArrowLeft className="mr-2 text-lg" /> Back
          </button>
          
          {/* Search Input */}
          <div className="flex-1" />
          <div className="relative flex items-center w-60 md:w-1/3">
            <FaSearch className="absolute left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search visitors..."
              className="h-10 px-4 py-2 border border-gray-300 rounded-md w-full pl-10"
              onChange={filterVisitors} // Filter visitors on change
            />
          </div>
          
          {/* Add New Visitor Button */}
          <button
            onClick={() => setOpen(true)} // This opens the modal
            className="h-10 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md flex items-center justify-center min-w-[150px] md:w-auto"
          >
            Add New Visitor
          </button>
          <AddModal open={open} setOpen={setOpen}>
            {/* Ensure you have imported RegisterVisitor in your AddModal */}
            <RegisterVisitor setOpen={setOpen} />
          </AddModal>
        </div>

        {/* Visitor List Table */}
        <div className="p-6 mt-32">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Visitor List</h2>
          {loading ? (
            <div className="text-center text-gray-600">Loading Visitors...</div>
          ) : (
            <div className="overflow-x-auto">
              <DataTable
                columns={defaultColumns} // Columns should be defined in VisitorHelper.jsx
                data={filteredVisitors}
                pagination
                className="shadow-lg rounded-lg overflow-hidden"
                customStyles={customStyles}
              />
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {/* Update Visitor Modal */}
      {selectedVisitor && (
        <UpdateVisitorModal
          open={true}
          setOpen={() => setSelectedVisitor(null)} // Close modal
          visitor={selectedVisitor}
          setVisitor={(updatedVisitor) => {
            // Update visitor in the list
            setVisitors((prev) =>
              prev.map((v) => (v._id === updatedVisitor._id ? updatedVisitor : v))
            );
            setSelectedVisitor(null); // Close the modal after update
          }}
        />
      )}

      {/* View Visitor Modal */}
      {viewVisitor && (
        <ViewVisitorModal
          open={true}
          setOpen={() => setViewVisitor(null)} // Close modal
          visitor={viewVisitor}
        />
      )}
    </div>
  );
};

export default List;
