import React from "react";
import { FaBell } from "react-icons/fa";

const NoticeButton = ({ notices, onClick }) => {
  const unreadCount = notices.filter((n) => !n.isRead).length;

  return (
    <button
      onClick={onClick}
      className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all relative"
    >
      <FaBell className="mr-2" /> Notices
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-2">
          {unreadCount}
        </span>
      )}
    </button>
  );
};

export default NoticeButton;
