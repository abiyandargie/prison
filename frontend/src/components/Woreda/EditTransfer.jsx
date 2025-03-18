import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

export default function EditTransfer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInmate = async () => {
      try {
        const response = await axiosInstance.get(`/transfer/get-transfer/${id}`);
        if (response.data) {
          setFormData(response.data.transfer);
        }
      } catch (error) {
        console.error("Error fetching transfer details:", error);
        toast.error("Failed to load transfer details.");
      } finally {
        setLoading(false);
      }
    };
    fetchInmate();
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
      await axiosInstance.put(`/transfer/update-transfer/${id}`, formData);
      toast.success("Transfer Updated Successfully!");
      navigate("/woreda-dashboard/inmates");
    } catch (error) {
      console.error("Error updating transfer:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to update transfer.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading transfer details...</p>;
  }

  if (!formData) {
    return <p className="text-center text-red-500">No transfer data found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg  my-5 shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Edit Inmate Transfer Request</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "First Name", name: "firstName", type: "text", required: true },
          { label: "Middle Name", name: "middleName", type: "text" },
          { label: "Last Name", name: "lastName", type: "text", required: true },
          { label: "Date of Birth", name: "dateOfBirth", type: "date", required: true },
          { label: "Crime", name: "crime", type: "text", required: true },
          { label: "Sentence Start", name: "sentenceStart", type: "date", required: true },
          { label: "Sentence End", name: "sentenceEnd", type: "date", required: true },
          { label: "From Prison", name: "fromPrison", type: "text", required: true },
          { label: "To Prison", name: "toPrison", type: "text", required: true },
          { label: "Transfer Date", name: "transferDate", type: "date", required: true }
        ].map(({ label, name, type, required }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name] || ""}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              required={required}
            />
          </div>
        ))}

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender || "male"}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Parole Eligibility */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Parole Eligibility</label>
          <select
            name="paroleEligibility"
            value={formData.paroleEligibility || "false"}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {/* Risk Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Risk Level</label>
          <select
            name="riskLevel"
            value={formData.riskLevel || "Low"}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Reason for Transfer */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Reason</label>
          <textarea
            name="reason"
            value={formData.reason || ""}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Update Transfer
          </button>
        </div>
      </form>
    </div>
  );
}
