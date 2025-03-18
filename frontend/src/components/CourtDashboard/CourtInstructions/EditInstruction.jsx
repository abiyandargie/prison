import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const CourtInstructions = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the instruction ID from the URL

  const [formData, setFormData] = useState({
    courtCaseNumber: "",
    judgeName: "",
    prisonName: "",
    verdict: "",
    instructions: "",
    hearingDate: new Date().toISOString().substring(0, 10),
    effectiveDate: new Date().toISOString().substring(0, 10),
    sendDate: new Date().toISOString().substring(0, 10),
  });

  const [signature, setSignature] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for form submission

  // Fetch existing instruction data
  useEffect(() => {
    if (!id) return; // Prevent unnecessary API calls if ID is not available

    const fetchInstruction = async () => {
      try {
        const response = await axiosInstance.get(`/instruction/get-instruct/${id}`);
        if (response.data?.instruction) {
          const instructionData = response.data.instruction;
          setFormData({
            courtCaseNumber: instructionData.courtCaseNumber || "",
            judgeName: instructionData.judgeName || "",
            prisonName: instructionData.prisonName || "",
            verdict: instructionData.verdict || "",
            instructions: instructionData.instructions || "",
            hearingDate: instructionData.hearingDate || new Date().toISOString().substring(0, 10),
            effectiveDate: instructionData.effectiveDate || new Date().toISOString().substring(0, 10),
            sendDate: instructionData.sendDate || new Date().toISOString().substring(0, 10),
          });
        }
      } catch (error) {
        console.error("Error fetching instruction:", error);
        toast.error("Failed to fetch instruction details.");
      }
    };

    fetchInstruction();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input changes
  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file) setFile(file);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formdata = new FormData();
      formdata.append("courtCaseNumber", formData.courtCaseNumber);
      formdata.append("judgeName", formData.judgeName);
      formdata.append("prisonName", formData.prisonName);
      formdata.append("verdict", formData.verdict);
      formdata.append("instructions", formData.instructions);
      formdata.append("hearingDate", formData.hearingDate);
      formdata.append("effectiveDate", formData.effectiveDate);
      formdata.append("sendDate", formData.sendDate);
      formdata.append("signature", signature);
      formdata.append("attachment", attachment);

      // Debugging: Log FormData contents
      for (let [key, value] of formdata.entries()) {
        console.log(key, value);
      }

      const response = await axiosInstance.put(`/instruction/edit/${id}`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        toast.success("Instruction updated successfully!");
        setFormData({
          courtCaseNumber: "",
          judgeName: "",
          prisonName: "",
          verdict: "",
          instructions: "",
          hearingDate: new Date().toISOString().substring(0, 10),
          effectiveDate: new Date().toISOString().substring(0, 10),
          sendDate: new Date().toISOString().substring(0, 10),
        });
        setSignature(null); // Reset signature
        setAttachment(null); // Reset attachment
        navigate("/court-dashboard/list");
      } else {
        toast.error("Failed to send instruction.");
      }
    } catch (error) {
      console.error("Error sending instruction:", error);
      toast.error("An error occurred while sending instruction.");
    }
  };
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-md mt-16">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Court Instruction</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Other Fields */}
          {[
            { label: "Court Case Number", name: "courtCaseNumber" },
            { label: "Judge Name", name: "judgeName" },
            { label: "Prison Name", name: "prisonName" },
          ].map(({ label, name }) => (
            <div className="mb-4" key={name}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                type="text"
                name={name}
                placeholder={`Enter ${label.toLowerCase()}`}
                value={formData[name]}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
          ))}

          {/* Verdict */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Verdict</label>
            <select
              name="verdict"
              value={formData.verdict}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            >
              <option value="">Select Verdict</option>
              <option value="guilty">Guilty</option>
              <option value="not_guilty">Not Guilty</option>
            </select>
          </div>

          {/* Date Inputs */}
          {["hearingDate", "effectiveDate", "sendDate"].map((dateField) => (
            <div className="mb-4" key={dateField}>
              <label className="block text-sm font-medium text-gray-700">
                {dateField.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type="date"
                name={dateField}
                value={formData[dateField]}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
          ))}

          {/* File Uploads */}
          {[
            { label: "Reporter Signature", state: signature, setState: setSignature },
            { label: "Attachment", state: attachment, setState: setAttachment },
          ].map(({ label, state, setState }) => (
            <div className="mb-4" key={label}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, setState)}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
          ))}
        </div>

        {/* Instruction Details */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Instruction Details</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading} className={`w-full py-2 px-4 rounded ${loading ? "bg-gray-400" : "bg-teal-600 hover:bg-teal-700"}`}>
          {loading ? "Updating..." : "Update Instruction"}
        </button>
      </form>
    </div>
  );
};

export default CourtInstructions;
