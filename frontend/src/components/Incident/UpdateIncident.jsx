import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TiArrowBack } from "react-icons/ti";
const UpdateIncident = () => {
  const { id } = useParams(); 
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const response = await axiosInstance.get(
          `/incidents/get-incident/${id}`
        );
        console.log(response.data);
        const incident = Array.isArray(response.data.incidents)
          ? response.data.incidents.find((item) => item._id === id) || {}
          : response.data.incidents;

        setFormData(incident);
      } catch (error) {
        console.error("Error fetching incident details:", error);
        toast.error("Failed to load incident details");
      }
    };
    fetchIncident();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(
        `/incidents/update-incident/${id}`,
        formData
      );
      if (response.data) {
        toast.success("Incident updated successfully!");
        navigate("/policeOfficer-dashboard/incident");
      }
    } catch (error) {
      console.error("Error updating incident:", error);
      toast.error("Failed to update incident");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <TiArrowBack
        size={50}
        onClick={() => navigate(-1)}
        className="cursor-pointer"
      />
      <h2 className="text-2xl font-bold mb-6">Update Incident</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Incident ID (Read-Only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Incident ID
            </label>
            <input
              type="text"
              name="incidentId"
              value={formData.incidentId || ""}
              disabled
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-100"
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
              value={formData.reporter || ""}
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
              value={formData.inmate || ""}
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
              value={
                formData.incidentDate
                  ? new Date(formData.incidentDate).toISOString().split("T")[0]
                  : ""
              }
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
              value={formData.incidentType || ""}
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
              value={formData.status || ""}
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
              type="text"
              name="attachment"
              value={formData.attachment || ""}
              onChange={handleChange}
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
              value={formData.description || ""}
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
              Update Incident
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateIncident;
