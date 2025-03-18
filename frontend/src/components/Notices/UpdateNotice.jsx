import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa"; // Back Icon
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateNoticeModal from "../Modals/UpdateNoticeModal";

const UpdateNotice = () => {
  const [notice, setNotice] = useState(null); // Store the notice data
  const [openModal, setOpenModal] = useState(true); // Open modal on load
  const navigate = useNavigate();
  const { id } = useParams();
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await axiosInstance.get(`/notice/get-notice/${id}`);
        setNotice(response.data.notice);
      } catch (error) {
        toast.error("Failed to load notice details");
      }
    };
    fetchNotice();
  }, [id]);

  return (
    <div className="flex">
      {/* Sidebar Spacing */}
      <div className={`transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`} />

      {/* Main Content */}
      <div className="flex-1 relative min-h-screen">
        
        {/* Fixed Header */}
        <div
          className={`bg-white shadow-md p-4 fixed top-14 z-20 flex items-center justify-between transition-all duration-300 ml-2 ${
            isCollapsed ? "left-16 w-[calc(100%-5rem)]" : "left-64 w-[calc(100%-17rem)]"
          }`}
        >
          {/* Back Button */}
          <button
            className="flex items-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md transition duration-300"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="mr-2 text-lg" /> Back
          </button>

          {/* Centered Header */}
          <h3 className="text-2xl font-bold text-gray-800 text-center flex-1">
            View Notice
          </h3>
        </div>

        {/* Show either the notice or the modal */}
        <div className="p-6 mt-32 flex justify-center">
          {!openModal ? (
            notice && (
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h3 className="text-xl font-bold text-gray-800 mb-4">📢 {notice.title}</h3>
                <p className="text-gray-600 mb-4">{notice.description}</p>
                <p className="text-gray-500 mb-4">Date: {new Date(notice.date).toLocaleString()}</p>
                <p className="text-gray-500 mb-4">Priority: {notice.priority}</p>
                <p className="text-gray-500 mb-4">Roles: {notice.roles.join(", ")}</p>
              </div>
            )
          ) : (
            <UpdateNoticeModal
              open={openModal}
              setOpen={setOpenModal} // Close modal on cancel
              notice={notice}
              setNotice={setNotice}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateNotice;
