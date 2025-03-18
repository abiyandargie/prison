import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { TiArrowBack } from "react-icons/ti";

const InmateClearance = ({setOpen}) => {
  const { inmateId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: new Date().toISOString().substring(0, 10),
    reason: "",
    remark: "",
    inmate: "", // Pre-populate this based on inmateId if possible
    sign: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sign, setSign] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Pre-populate inmate's name if inmateId is available
  useEffect(() => {
    const fetchInmateDetails = async () => {
      try {
        const response = await axiosInstance.get(`/inmates/${inmateId}`);
        if (response.data) {
          setFormData((prevData) => ({
            ...prevData,
            inmate: response.data.name, // Set inmate name from API
          }));
        }
      } catch (error) {
        console.error("Error fetching inmate details:", error);
      }
    };

    if (inmateId) {
      fetchInmateDetails();
    }
  }, [inmateId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Reset error message

    const formdata = new FormData();
    formdata.append("date", formData.date);
    formdata.append("reason", formData.reason);
    formdata.append("inmate", formData.inmate);
    formdata.append("remark", formData.remark);

    if (sign) {
      formdata.append("sign", sign);
    }

    try {
      const response = await axiosInstance.post("/clearance/add-clearance", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data) {
        alert("Clearance processed successfully.");
        setOpen(false)
        setFormData({
          date: new Date().toISOString().substring(0, 10),
          reason: "",
          remark: "",
          inmate: "",
          sign: "",
        });
        navigate("/securityStaff-dashboard/clearance");
      } else {
        setErrorMessage("Failed to process clearance.");
      }
    } catch (error) {
      console.error("Error processing clearance:", error);
      setErrorMessage(error.response?.data?.error || "An error occurred while processing clearance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      
      <h2 className="text-2xl font-bold mb-6 text-center">Process Inmate Clearance</h2>
      {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Clearance Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Registrar Name</label>
            <input
              type="text"
              name="inmate"
              value={formData.inmate}
              placeholder="Enter registrar name"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Clearance Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              placeholder="Enter clearance reason"
              onChange={handleChange}
              rows="3"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Additional Remarks</label>
            <textarea
              name="remark"
              value={formData.remark}
              placeholder="Enter any additional remarks"
              onChange={handleChange}
              rows="2"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            ></textarea>
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700">Signature</label>
            <input
              type="file"
              name="sign"
              onChange={(e) => setSign(e.target.files[0])}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              accept=".jpg,.png,.jpeg,.pdf" // Optional: restrict file types
            />
          </div>
        </div>
        <div className="mt-6 flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 md:space-x-2">
          <button type="submit" disabled={loading} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
            {loading ? "Processing..." : "Process Clearance"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InmateClearance;
