import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

const PostNotice = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [roles, setRoles] = useState([]);
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [isPosted, setIsPosted] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);

  const roleOptions = ["Visitor", "Police Officer", "Security Staff", "Admin", "Court"];
  const priorityOptions = ["Low", "Normal", "High", "Urgent"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !date || roles.length === 0) {
      toast.error("Please fill in all fields and select at least one role.");
      return;
    }
    setLoading(true);
    try {
      await axiosInstance.post("/notice/add-notice", { title, description, date, priority, roles, isPosted });
      toast.success("Notice posted successfully!");
      setTitle("");
      setDescription("");
      setDate("");
      setPriority("Normal");
      setRoles([]);
      setIsPosted(false);
      navigate("/inspector-dashboard/notices");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to post notice.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col transition-all mt-12 duration-300 ${isCollapsed ? "ml-16" : "ml-64"}`}>
      <div
        className={`bg-white shadow-md p-4 fixed top-14 z-20 transition-all duration-300 ml-2 ${isCollapsed ? "left-16 w-[calc(100%-5rem)]" : "left-64 w-[calc(100%-17rem)]"}`}
      >
        <div className="flex items-center justify-between">
          <button
            className="flex items-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md transition duration-300"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="mr-2 text-lg" /> Back
          </button>
          <h3 className="text-2xl font-bold text-gray-800 text-center flex-1">Post a Notice</h3>
          <div className="w-24" />
        </div>
      </div>

      <div className="flex justify-center items-center min-h-screen p-6 mt-20">
        <div className="max-w-lg w-full bg-white p-8 shadow-lg rounded-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Notice Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                rows="4"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              >
                {priorityOptions.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Mark as Posted</label>
              <input
                type="checkbox"
                checked={isPosted}
                onChange={() => setIsPosted(!isPosted)}
                className="mr-2"
              />
              <span>{isPosted ? "Yes" : "No"}</span>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Select Roles</label>
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
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Notice"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostNotice;
