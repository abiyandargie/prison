import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const ViewNoticeModal = ({ open, setOpen, notice, onDelete, onToggleActivation }) => {
  const [showMore, setShowMore] = useState(false);

  if (!open || !notice) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto relative border border-gray-200">
        {/* Close Button - Now just closes modal */}
        <button
          className="absolute top-4 right-4 bg-gray-200 hover:bg-red-500 hover:text-white text-gray-600 rounded-full p-2 transition duration-300 shadow-md"
          onClick={() => setOpen(false)} // ✅ Closes the modal and stays on the Notice List
        >
          <FaTimes size={18} />
        </button>

        <h3 className="text-3xl font-extrabold text-gray-800 text-center mb-4">📢 Notice Details</h3>

        <div className="space-y-5">
          <div>
            <p className="font-semibold text-lg text-gray-700">📌 Title:</p>
            <p className="text-gray-900 text-xl font-medium">{notice?.title || "N/A"}</p>
          </div>

          <div>
            <p className="font-semibold text-lg text-gray-700">📝 Description:</p>
            <p className="text-gray-700 leading-relaxed">
              {showMore || (notice?.description?.length ?? 0) < 100
                ? notice.description
                : `${notice.description.substring(0, 100)}...`}
            </p>
            {notice?.description?.length > 100 && (
              <button
                className="text-blue-600 hover:underline text-sm mt-1 transition duration-200"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Show Less" : "Load More"}
              </button>
            )}
          </div>

          <div>
            <p className="font-semibold text-lg text-gray-700">📅 Date:</p>
            <p className="text-gray-800">{notice?.date ? new Date(notice.date).toLocaleString() : "N/A"}</p>
          </div>

          <div>
            <p className="font-semibold text-lg text-gray-700">⚡ Priority:</p>
            <p className="text-gray-900 font-medium">{notice?.priority || "N/A"}</p>
          </div>

          <div>
            <p className="font-semibold text-lg text-gray-700">👥 Roles:</p>
            <p className="text-gray-800">{notice?.roles?.join(", ") || "N/A"}</p>
          </div>

          <div>
            <p className="font-semibold text-lg text-gray-700">👁️ Read By:</p>
            {notice?.readBy?.length > 0 ? (
              <ul className="text-gray-800 list-disc list-inside">
                {notice.readBy.map((user) => (
                  <li key={user._id}>{user.name}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No one has read this notice yet.</p>
            )}
          </div>

          <div>
            <p className="font-semibold text-lg text-gray-700">📌 Status:</p>
            <span
              className={`inline-block px-4 py-1 rounded-full text-white font-semibold ${
                notice?.isPosted ? "bg-green-600" : "bg-red-500"
              }`}
            >
              {notice?.isPosted ? "Posted" : "Not Posted"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mt-6">
          <button
            className={`w-1/2 py-2 px-3 rounded font-medium transition duration-300 ${
              notice?.isPosted
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
            onClick={onToggleActivation}
          >
            {notice?.isPosted ? "Remove Post" : "Post"}
          </button>

          <button
            className="w-1/2 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded font-medium transition duration-300"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewNoticeModal;
