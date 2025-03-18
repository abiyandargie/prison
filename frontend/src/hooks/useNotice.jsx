import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance.js";

const useNotices = () => {
  const [notices, setNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axiosInstance.get("/notice/getAllNotices");
        if (response.data) {
          setNotices(response.data.notices.filter((n) => n.isPosted));
        }
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchNotices();
  }, []);

  // Function to mark notice as read
  const markNoticeAsRead = async (notice) => {
    if (!notice.isRead) {
      try {
        await axiosInstance.patch(`/notice/markAsRead/${notice._id}`);
        setNotices((prev) =>
          prev.map((n) => (n._id === notice._id ? { ...n, isRead: true } : n))
        );
      } catch (error) {
        console.error("Error marking notice as read:", error);
      }
    }
    setSelectedNotice(notice);
  };

  return {
    notices,
    selectedNotice,
    isModalOpen,
    setIsModalOpen,
    setSelectedNotice,
    markNoticeAsRead,
  };
};

export default useNotices;
