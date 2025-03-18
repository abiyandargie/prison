import React from "react";
import { FaCheckCircle, FaCircle } from "react-icons/fa"; 

const NoticeModal = ({ notices, isOpen, onClose, onSelectNotice, selectedNotice }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-2">Notices</h2>

        {!selectedNotice ? (
          <>
            {notices.length > 0 ? (
              notices.map((notice) => (
                <div 
                  key={notice._id} 
                  className="flex items-center border-b border-gray-200 py-2 cursor-pointer hover:bg-gray-100 px-2 rounded-md"
                  onClick={() => onSelectNotice(notice)}
                >
                  {notice.isRead ? (
                    <FaCheckCircle className="text-green-500 mr-2" />
                  ) : (
                    <FaCircle className="text-red-500 mr-2" />
                  )}

                  <p className={`font-medium ${notice.isRead ? "text-gray-500" : "text-blue-600"}`}>{notice.title}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No new notices</p>
            )}
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-1">{selectedNotice.title}</h3>
            <p className="text-gray-600">{selectedNotice.description}</p>
            <p className="text-sm text-gray-500 mt-2">Priority: {selectedNotice.priority}</p>
            <p className="text-sm text-gray-500">Date: {new Date(selectedNotice.date).toLocaleDateString()}</p>

            <button 
              className="mt-3 bg-gray-500 text-white px-4 py-2 rounded-lg w-full hover:bg-gray-600"
              onClick={() => onSelectNotice(null)}
            >
              Back to Notices
            </button>
          </>
        )}

        <button 
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NoticeModal;
