import axiosInstance from "../../utils/axiosInstance";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";

const AddPrison = () => {
  const [prisonData, setPrisonData] = useState({
    prison_name: "",
    location: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrisonData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/prison/new-prison", prisonData);

      if (response.data) {
        toast.success("Prison added successfully!");
        navigate("/inspector-dashboard/prisons");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.error || "Failed to add prison. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col transition-all mt-12 duration-300 ${isCollapsed ? "ml-16" : "ml-64"}`}>
      {/* Header Section */}
      <div
        className={`bg-white shadow-md p-4 fixed top-14 z-20 transition-all duration-300 ml-2 ${isCollapsed ? "left-16 w-[calc(100%-5rem)]" : "left-64 w-[calc(100%-17rem)]"}`}
      >
        <div className="flex items-center justify-between">
          {/* Back Button - Left Aligned */}
          <button
            className="flex items-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md transition duration-300"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="mr-2 text-lg" /> Back
          </button>

          {/* Centered Header Title */}
          <h3 className="text-2xl font-bold text-gray-800 text-center flex-1">Add New Prison</h3>

          {/* Empty placeholder for spacing balance */}
          <div className="w-24" />
        </div>
      </div>

      {/* Form Section */}
      <div className="flex justify-center items-center min-h-screen p-6 mt-2">
        <div className="max-w-lg w-full bg-white p-8 shadow-lg rounded-md">
          <form onSubmit={handleSubmit}>
            {/* Prison Name */}
            <div className="mb-4">
              <label htmlFor="prison_name" className="block text-sm font-medium text-gray-700">
                Prison Name
              </label>
              <input
                type="text"
                name="prison_name"
                value={prisonData.prison_name}
                onChange={handleChange}
                placeholder="Enter prison name"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>

            {/* Location */}
            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location / Woreda
              </label>
              <input
                type="text"
                name="location"
                value={prisonData.location}
                onChange={handleChange}
                placeholder="Enter location or woreda"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={prisonData.description}
                onChange={handleChange}
                placeholder="Provide details about the prison"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                rows="4"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Prison"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPrison;
