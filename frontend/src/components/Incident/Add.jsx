import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS
import { TiArrowBack } from "react-icons/ti";

const Add = ({setOpen}) => {
  const [formData, setFormData] = useState({});
  const [attachment, setAttachment] = useState(null); // Changed to null
  const navigate = useNavigate(); // Initialize navigate hook

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("incidentId", formData.incidentId);
    formdata.append("reporter", formData.reporter);
    formdata.append("inmate", formData.inmate);
    formdata.append("incidentDate", formData.incidentDate);
    formdata.append("incidentType", formData.incidentType);
    formdata.append("status", formData.status);
    formdata.append("description", formData.description);

    if (attachment) {
      formdata.append("attachment", attachment);
    }

    try {
      const response = await axiosInstance.post(
        "/incidents/new-incident", // Change this to your actual API
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data) {
        toast.success("New Incident Registered Successfully!");
        setFormData({}); // Reset form after successful submission
        setAttachment(null); // Clear the attachment state
        setOpen(false)
        navigate("/policeOfficer-dashboard/incident"); // Redirect after adding
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        toast.error(
          error.response.data.message ||
            "An error occurred while adding the incident."
        );
      } else {
        toast.error("Error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="w-full mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      
      <h2 className="text-2xl font-bold mb-6">Add New Incident</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Incident ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Incident ID
            </label>
            <input
              type="text"
              name="incidentId"
              placeholder="Enter Incident ID"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Reporter Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reporter Name
            </label>
            <input
              type="text"
              name="reporter"
              placeholder="Reporter Name"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Inmate */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Inmate
            </label>
            <input
              type="text"
              name="inmate"
              placeholder="Inmate Name"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Date of Incident */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Incident
            </label>
            <input
              type="date"
              name="incidentDate"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Incident Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Incident Type
            </label>
            <select
              name="incidentType"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Incident Type</option>
              <option value="Theft">Theft</option>
              <option value="Harassment">Harassment</option>
              <option value="Accident">Accident</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
              <option value="Escalated">Escalated</option>
            </select>
          </div>

          {/* Upload Attachment */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Attachment (Optional)
            </label>
            <input
              type="file"
              name="attachment"
              accept="image/*"
              onChange={(e) => setAttachment(e.target.files[0])}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Describe the incident..."
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              rows="4"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className={`w-full mt-6 ${
                formData.reporter && formData.incidentDate && formData.status
                  ? "bg-teal-600 hover:bg-teal-700"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white font-bold py-2 px-4 rounded `}
              disabled={
                !formData.reporter || !formData.incidentDate || !formData.status
              }
            >
              Add Incident
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Add;
