import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance.js";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [photo, setPhoto] = useState(null);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      if (photo) formDataToSend.append("photo", photo);

      await axiosInstance.put("/user/update-profile", formDataToSend);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="mt-24 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        {/* Back Button */}
         <button
                className="flex items-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md transition duration-300"
                onClick={() => navigate(-1)}
              >
                <FaArrowLeft className="mr-2 text-lg" /> Back
              </button>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Update Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Read-only Name Fields */}
          <div>
            <label className="block text-gray-700 font-semibold">First Name:</label>
            <input 
              type="text" 
              value={user.firstName} 
              readOnly 
              className="bg-gray-200 cursor-not-allowed border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Middle Name:</label>
            <input 
              type="text" 
              value={user.middleName} 
              readOnly 
              className="bg-gray-200 cursor-not-allowed border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Last Name:</label>
            <input 
              type="text" 
              value={user.lastName} 
              readOnly 
              className="bg-gray-200 cursor-not-allowed border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>

          {/* Profile Picture Upload */}
          <div>
            <label className="block text-gray-700 font-semibold">Profile Picture:</label>
            <input 
              type="file" 
              name="photo" 
              onChange={handleFileChange} 
              className="border border-gray-300 rounded-md px-3 py-2 w-full cursor-pointer"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg w-full transition duration-300 shadow-md"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
