import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { TiArrowBack } from "react-icons/ti";

const RegisterVisitor = ({setOpen}) => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
const [inmates, setInmates] = useState([]);
  const [loading, setLoading] = useState(false); 

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
  useEffect(() => {
    const getVisitor = async () => {
      try {
        if (user) {
          setFormData({
            visitorId: user._id || "",
            firstName: user.firstName || "",
            middleName: user.middleName || "",
            lastName: user.lastName || "",
            inmate: "",
            relation: "",
            purpose: "",
            phone: "",
            date: "",
          });
        }
      } catch (error) {
        console.error("Error fetching visitor:", error);
        toast.error("Error fetching visitor");
      }
    };

    getVisitor();
    fetchInmates();
  }, [user]); // Add user as a dependency

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data Before Submission:", formData); // Debugging

    try {
      const response = await axiosInstance.post("/visitor/new-visitor", formData);
      console.log("Response:", response.data); // Debugging

      if (response.data) {
        toast.success("Visitor Information Registered Successfully!");
        setOpen(false)
        navigate("/policeOfficer-dashboard/visitors");
      }
    } catch (error) {
      console.error("Error:", error.response?.data); // Debugging
      toast.error(error.response?.data?.message || "Failed to register visitor.");
    }
  };

  return (
    <div className="w-full mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
     
      <h2 className="text-2xl font-bold mb-6 text-center">Register Visitor</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Form fields */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mt-3">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mt-3">Middle Name</label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mt-3">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
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
              value={formData.relation}
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
              value={formData.purpose}
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
              value={formData.date}
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
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="flex justify-center w-full">
            <button
              type="submit"
              className={`w-full mt-6 ${
                formData.firstName &&
                formData.phone &&
                formData.middleName &&
                formData.lastName &&
                formData.relation &&
                formData.date
                  ? "bg-teal-600 hover:bg-teal-700"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white font-bold py-2 px-4 rounded`}
              disabled={
                !formData.firstName ||
                !formData.phone ||
                !formData.middleName ||
                !formData.lastName ||
                !formData.relation ||
                !formData.date
              }
            >
              Register Visitor
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterVisitor;