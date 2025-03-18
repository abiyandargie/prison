import React, { useState, useEffect } from "react";
import { toast } from "react-toastify"; // Importing toast
import axiosInstance from "../../utils/axiosInstance.js"; // Assuming axiosInstance is imported

const UpdateVisitorModal = ({ open, setOpen, visitor, setVisitor }) => {
  const [formData, setFormData] = useState({
    firstName: visitor.firstName,
    middleName: visitor.middleName,
    lastName: visitor.lastName,
    inmate: visitor.inmate,
    relation: visitor.relation,
    purpose: visitor.purpose,
    phone: visitor.phone,
    date: visitor.date ? new Date(visitor.date).toISOString().split('T')[0] : "", // Ensure correct date format
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit (Save Changes)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.put(`/visitor/update/${visitor._id}`, formData);
      if (response.data.success) {
        // Update visitor state and close modal
        setVisitor((prev) =>
          prev.map((v) => (v._id === visitor._id ? { ...v, ...formData } : v))
        );
        setOpen(false);
        toast.success("Visitor updated successfully!"); // Show success toast
      } else {
        toast.error("Failed to update visitor.");
      }
    } catch (error) {
      console.error("Error updating visitor:", error);
      toast.error("Error updating visitor.");
    }
  };

  // Close modal if not open
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-md mx-auto">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Update Visitor</h3>
        <form onSubmit={handleSubmit}>
          <div className="overflow-y-auto max-h-96 space-y-4">
            {/* Form fields */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Relation</label>
              <input
                type="text"
                name="relation"
                value={formData.relation}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Purpose</label>
              <input
                type="text"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white font-medium px-6 py-2 rounded-md transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-2 rounded-md transition duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateVisitorModal;
