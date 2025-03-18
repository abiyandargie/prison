import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import { columns as defaultColumns } from "../../utils/NoticeHelper";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import UpdateNoticeModal from "../Modals/UpdateNoticeModal";
import ViewNoticeModal from "../Modals/ViewNoticeModal";

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

const NoticesList = () => {
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [viewNotice, setViewNotice] = useState(null); // For View Modal
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/notice/getAllNotices");

        if (response.data && Array.isArray(response.data.data)) {
          const formattedData = response.data.data.map((notice) => ({
            ...notice,
            action: (
              <div className="flex gap-2">
                {/* View Button (Opens Modal) */}
                <button
                  onClick={() => setViewNotice(notice)}
                  className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg shadow-md transition duration-300"
                >
                  View
                </button>

                {/* Edit Button (Opens Modal) */}
                <button
                  onClick={() => setSelectedNotice(notice)}
                  className="text-white bg-teal-600 hover:bg-teal-700 px-3 py-1 rounded-lg shadow-md transition duration-300"
                >
                  Edit
                </button>
              </div>
            ),
          }));

          setNotices(formattedData);
          setFilteredNotices(formattedData);
        } else {
          console.error("Unexpected API response format:", response.data);
          alert("Invalid response format from server.");
        }
      } catch (error) {
        console.error("Error fetching notices:", error);
        alert("Failed to fetch notices.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const filterNotices = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = notices.filter((notice) =>
      notice.title.toLowerCase().includes(query)
    );
    setFilteredNotices(filtered);
  };

  return (
    <div className="flex">
      <div className={`transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`} />
      <div className="flex-1 relative min-h-screen">
        <div
          className={`bg-white shadow-md p-4 fixed top-14 z-20 flex flex-wrap items-center justify-between transition-all duration-300 ml-2 gap-2 ${isCollapsed ? "left-16 w-[calc(100%-5rem)]" : "left-64 w-[calc(100%-17rem)]"
            }`}
        >
          <button
            className="flex items-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md transition duration-300"
            onClick={() => window.history.back()}
          >
            <FaArrowLeft className="mr-2 text-lg" /> Back
          </button>
          <div className="flex-1" />
          <div className="relative flex items-center w-60 md:w-1/3">
            <FaSearch className="absolute left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search by title"
              className="h-10 px-4 py-2 border border-gray-300 rounded-md w-full pl-10"
              onChange={filterNotices}
            />
          </div>
          <Link
            to="/inspector-dashboard/add-notice"
            className="h-10 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md flex items-center justify-center min-w-[150px] md:w-auto"
          >
            Add New Notice
          </Link>
        </div>

        <div className="p-6 mt-32">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Notice List</h2>
          {loading ? (
            <div className="text-center text-gray-600">Loading Notices...</div>
          ) : (
            <div className="overflow-x-auto">
              <DataTable
                columns={defaultColumns}
                data={filteredNotices}
                pagination
                className="shadow-lg rounded-lg overflow-hidden"
                customStyles={customStyles}
              />
            </div>
          )}
        </div>
      </div>

      {/* Update Notice Modal */}
      {selectedNotice && (
        <UpdateNoticeModal
          open={true}
          setOpen={() => setSelectedNotice(null)}
          notice={selectedNotice}
          setNotice={(updatedNotice) => {
            setNotices((prev) =>
              prev.map((n) => (n._id === updatedNotice._id ? updatedNotice : n))
            );
            setSelectedNotice(null);
          }}
        />
      )}

      {/* View Notice Modal */}
      {viewNotice && (
        <ViewNoticeModal
          open={true}
          setOpen={() => setViewNotice(null)}
          notice={viewNotice}
        />
      )}
    </div>
  );
};

export default NoticesList;
