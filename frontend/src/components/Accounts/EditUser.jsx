import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);

  const [photo, setPhoto] = useState(null);
  const [user, setUser] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    gender: "",
    role: "",
    photo: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/user/get-user/${id}`);
        if (response.data) {
          setUser(response.data.user);
        } else {
          toast.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error(error.response?.data?.message || "Error fetching user details");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("middleName", user.middleName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("role", user.role);
    formData.append("gender", user.gender);
    if (photo) formData.append("photo", photo);

    setSubmitting(true);
    try {
      const response = await axiosInstance.put(`/user/update-user/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data) {
        toast.success("User updated successfully!");
        setTimeout(() => navigate("/admin-dashboard/users"), 1500);
      } else {
        toast.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error.response?.data?.message || "Error updating user");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`max-w-4xl mx-auto mt-24 bg-white p-8 rounded-md shadow-md transition-all ${isCollapsed ? "ml-20" : "ml-72"}`}>
      <div className="flex items-center mb-6">
        <button
          className="flex items-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md transition duration-300"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="mr-2 text-lg" /> Back
        </button>
        <h2 className="text-2xl font-bold ml-4">Edit User</h2>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={user.middleName}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={user.gender}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
              {user.photo && !photo && (
                <img src={user.photo} alt="Profile Preview" className="w-24 h-24 object-cover mt-2 rounded-full" />
              )}
              {photo && (
                <img src={URL.createObjectURL(photo)} alt="New Profile Preview" className="w-24 h-24 object-cover mt-2 rounded-full" />
              )}
            </div>
          </div>

          <button
  type="submit"
  className="w-full mt-6 bg-gradient-to-b from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white font-bold py-3 px-5 rounded-lg shadow-lg transform active:translate-y-1 transition-all duration-300"
  disabled={submitting}
>
  {submitting ? "Updating..." : "Edit User"}
</button>

        </form>
      )}
    </div>
  );
};

export default EditUser;
