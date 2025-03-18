import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import "react-toastify/dist/ReactToastify.css";
import ConfirmModal from "../Modals/ConfirmModal";
import ViewNoticeModal from "../Modals/ViewNoticeModal";

const ViewNotice = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const [openActivate, setOpenActivate] = useState(false);
  const [openModal, setOpenModal] = useState(true); // Start modal open

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await axiosInstance.get(`/notice/get-notice/${id}`);
        if (!response.data.success || !response.data.data) {
          throw new Error("Invalid API response format");
        }
        setNotice(response.data.data);
      } catch (error) {
        toast.error(error.response?.data?.error || "Error fetching notice details");
      } finally {
        setLoading(false);
      }
    };
    fetchNotice();
  }, [id]);

  const deleteNotice = async () => {
    try {
      await axiosInstance.delete(`/notice/delete-notice/${id}`);
      toast.success("Notice deleted successfully!");
      setOpenModal(false); // Close modal after delete
      navigate("/Inspector-dashboard/notices");
    } catch (error) {
      toast.error(error.response?.data?.error || "Error deleting notice");
    }
  };

  const toggleActivation = async () => {
    if (!notice) return;
    try {
      const updatedStatus = !notice.isPosted;
      await axiosInstance.put(`/notice/post-notice/${id}`, { isPosted: updatedStatus });
      setNotice((prevNotice) => ({ ...prevNotice, isPosted: updatedStatus }));
      toast.success(`Notice ${updatedStatus ? "Posted" : "Post Removed"} successfully!`);
    } catch (error) {
      toast.error(error.response?.data?.error || "Error updating notice status");
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg font-semibold animate-pulse">Loading Notice details...</p>
        </div>
      ) : (
        <ViewNoticeModal
          open={openModal}
          setOpen={setOpenModal}
          notice={notice}
          onDelete={() => setOpenDelete(true)}
          onToggleActivation={() => setOpenActivate(true)}
        />
      )}

      {/* Confirmation Modals */}
      <ConfirmModal
        open={openActivate}
        setOpen={setOpenActivate}
        onDelete={toggleActivation}
        message={`Do you want to ${notice?.isPosted ? "Remove Post" : "Post"} this notice?`}
      />
      <ConfirmModal
        open={openDelete}
        setOpen={setOpenDelete}
        onDelete={deleteNotice}
        message="Do you really want to delete this post? This action cannot be undone."
      />
    </>
  );
};

export default ViewNotice;
