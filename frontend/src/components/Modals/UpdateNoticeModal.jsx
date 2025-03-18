import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const UpdateNoticeModal = ({ open, setOpen, notice, setNotice }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [roles, setRoles] = useState([]); // Always an array
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("Normal");

  useEffect(() => {
    if (notice) {
      setTitle(notice.title || "");
      setDescription(notice.description || "");
      setRoles(notice.roles || []);
      setDate(notice.date || "");
      setPriority(notice.priority || "Normal");
    }
  }, [notice]);

  const roleOptions = ["Visitor", "Police Officer", "Security Staff", "Admin", "Court"];
  const priorityOptions = ["Low", "Normal", "High", "Urgent"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !date || roles.length === 0) {
      alert("Please fill in all fields and select at least one role.");
      return;
    }

    try {
      const response = await axiosInstance.put(`/notice/update-notice/${notice._id}`, {
        title,
        description,
        date,
        priority,
        roles,
      });
      setNotice(response.data.notice);
      toast.success("Notice updated successfully!");
      setOpen(false); // Close modal and stay on the Notice List
    } catch (error) {
      toast.error("Failed to update notice.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 bg-gray-200 hover:bg-red-500 hover:text-white text-gray-600 rounded-full p-2 transition duration-300"
          onClick={() => setOpen(false)} // Closes modal but stays on the same page
        >
          X
        </button>

        <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">Update Notice</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="date"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <select
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {priorityOptions.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>

          <label className="block font-bold text-lg mb-4">Select Roles:</label>
          <div className="grid grid-cols-2 gap-2">
            {roleOptions.map((role) => (
              <label key={role} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={role}
                  checked={roles.includes(role)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setRoles([...roles, role]);
                    } else {
                      setRoles(roles.filter((r) => r !== role));
                    }
                  }}
                />
                <span>{role}</span>
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg"
          >
            Update Notice
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateNoticeModal;
