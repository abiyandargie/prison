import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TiArrowBack } from "react-icons/ti";

const EditVisitor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [inmates, setInmates] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    const fetchVisitor = async () => {
      try {
        const response = await axiosInstance.get(`/visitor/get-Visitor/${id}`);
        if (response.data) {
          setFormData(response.data.visitor);
        }
      } catch (error) {
        console.error("Error fetching visitor details:", error);
      }
    };

    const fetchInmates = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/inmates/allInmates");
        if (response.data?.inmates) {
          setInmates(response.data.inmates); // Fixed incorrect variable usage
        } else {
          console.error("Invalid API response:", response);
        }
      } catch (error) {
        console.error("Error fetching inmates:", error);
        alert(error.response?.data?.error || "Failed to fetch inmate data.");
      } finally {
        setLoading(false);
      }
    };

    fetchVisitor();
    fetchInmates();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(`/visitor/${id}`, formData);
      if (response.data) {
        toast.success("Visitor Information Updated Successfully!");
        navigate("/policeOfficer-dashboard/visitors");
      }
    } catch (error) {
      console.error("Error updating visitor:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to update visitor.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <TiArrowBack size={50} onClick={() => navigate(-1)} className="cursor-pointer" />
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Visitor</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">Middle Name</label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName || ""}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">Inmate Name</label>
            <select
              name="inmate"
              value={formData.inmate || ""}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Inmate</option>
              {inmates.map((inmate) => (
                <option key={inmate._id} value={inmate.fullName}>
                  {inmate.fullName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">Relationship with Inmate</label>
            <select
              name="relation"
              value={formData.relation || ""}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Relationship</option>
              <option value="family">Family</option>
              <option value="friend">Friend</option>
              <option value="lawyer">Lawyer</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">Purpose of Visit</label>
            <input
              type="text"
              name="purpose"
              value={formData.purpose || ""}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">Visit Date</label>
            <input
              type="date"
              name="date"
              value={formData.date || ""}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">Contact Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-center w-full">
            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              {loading ? "Updating..." : "Update Visitor"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditVisitor;
