import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function InmateTransferForm() {
  const [prisons, setPrisons] = useState([]);
  const [transferData, setTransferData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "male", // Set default gender
    crime: "",
    sentenceStart: "",
    sentenceEnd: "",
    paroleEligibility: "false",
    medicalConditions: "",
    riskLevel: "Low",
    specialRequirements: "",
    fromPrison: "", // Set dynamically after fetching
    toPrison: "main",
    reason: "",
    status: "Pending",
    transferDate: "",
  });
 const navigate=useNavigate();
  useEffect(() => {
    fetchPrison();
  }, []);

  const fetchPrison = async () => {
    try {
      const response = await axiosInstance.get("/prison/getall-prisons", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data?.prisons?.length > 0) {
        setPrisons(response.data.prisons);
        setTransferData((prev) => ({
          ...prev,
          fromPrison: response.data.prisons[0].prison_name, // Default to first prison
        }));
      }
    } catch (error) {
      console.error("Error fetching prisons:", error);
      alert(error.response?.data?.error || "Failed to fetch Prison data.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransferData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(transferData);
      await axiosInstance.post("/transfer/new-transfer", transferData);
      alert("Transfer request submitted successfully");
     navigate("/woreda-dashboard/inmates")
    } catch (error) {
      console.error("Error submitting transfer:", error);
      alert("Failed to submit transfer");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4">Inmate Transfer Request</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* First Name */}
        <div className="col-span-1">
          <label className="block mb-2">First Name</label>
          <input type="text" name="firstName" onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        {/* Middle Name */}
        <div className="col-span-1">
          <label className="block mb-2">Middle Name</label>
          <input type="text" name="middleName" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        {/* Last Name */}
        <div className="col-span-2">
          <label className="block mb-2">Last Name</label>
          <input type="text" name="lastName" onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        {/* Date of Birth */}
        <div className="col-span-1">
          <label className="block mb-2">Date of Birth</label>
          <input type="date" name="dateOfBirth" onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        {/* Gender */}
        <div className="col-span-1">
          <label className="block mb-2">Gender</label>
          <select name="gender" value={transferData.gender} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Crime */}
        <div className="col-span-2">
          <label className="block mb-2">Crime</label>
          <input type="text" name="crime" onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        {/* Sentence Start */}
        <div className="col-span-1">
          <label className="block mb-2">Sentence Start</label>
          <input type="date" name="sentenceStart" onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        {/* Sentence End */}
        <div className="col-span-1">
          <label className="block mb-2">Sentence End</label>
          <input type="date" name="sentenceEnd" onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        {/* Parole Eligibility */}
        <div className="col-span-1">
          <label className="block mb-2">Parole Eligibility</label>
          <select name="paroleEligibility" value={transferData.paroleEligibility} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {/* Medical Conditions */}
        <div className="col-span-1">
          <label className="block mb-2">Medical Conditions</label>
          <input type="text" name="medicalConditions" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        {/* Risk Level */}
        <div className="col-span-1">
          <label className="block mb-2">Risk Level</label>
          <select name="riskLevel" value={transferData.riskLevel} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Special Requirements */}
        <div className="col-span-1">
          <label className="block mb-2">Special Requirements</label>
          <input type="text" name="specialRequirements" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        {/* From Prison */}
        <div className="col-span-2">
          <label className="block mb-2">From Prison</label>
          <select name="fromPrison" value={transferData.fromPrison} onChange={handleChange} className="w-full p-2 border rounded">
            {prisons.map((prison) => (
              <option key={prison.id} value={prison.prison_name}>
                {prison.prison_name}
              </option>
            ))}
          </select>
        </div>

        {/* To Prison */}
        <div className="col-span-2">
          <label className="block mb-2">To Prison</label>
          <input type="text" name="toPrison" value={transferData.toPrison} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        {/* Reason for Transfer */}
        <div className="col-span-2">
          <label className="block mb-2">Reason</label>
          <textarea name="reason" onChange={handleChange} className="w-full p-2 border rounded" required></textarea>
        </div>

        {/* Transfer Date */}
        <div className="col-span-2">
          <label className="block mb-2">Transfer Date</label>
          <input type="date" name="transferDate" onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
            Submit Transfer
          </button>
        </div>
      </form>
    </div>
  );
}
