import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS
import { TiArrowBack } from "react-icons/ti";
const VisitorRegister = () => {
  const navigate = useNavigate();
  const initialUser = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    gender: "",
    role: "Visitor",
    password: "",
    photo: "",
  };
  const [user, setUsers] = useState(initialUser);
  const handleChange = (e) => {
    setUsers({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/user/create-account", {
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        email: user.email,
        gender:user.gender,
        role: "visitor",
        password: user.password,
        photo: user.photo,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        toast.success("Visitor Registred Successfully !");
        navigate("/login");
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Login error, try again.");
    }
  };

  return (
    <div className="bg-gray-200 w-screen h-screen flex flex-col fixed">
      <header className="bg-green-600 text-white text-center py-4">
        <h1 className="text-xl font-bold">Welcome Wolkite Prison Management</h1>
      </header>
    <div className="w-[70%] mx-auto  bg-white px-5 rounded-md shadow-md  overflow-y-scroll">
      <TiArrowBack size={50} onClick={()=>navigate(-1)}/>
      <h2 className="text-2xl font-bold mb-6">Register Visitor</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter First name"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Middle Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Middle Name
            </label>
            <input
              type="text"
              name="middleName"
              placeholder="Enter Middle name"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter Last name"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="******"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Profile Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Profile Picture
            </label>
            <input
              type="text"
              name="photo"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>

          {/* Submit Button */}
        </div>
        <div>
          <button
            type="submit"
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
    <footer className="bg-gray-800 text-white text-center py-4">
    <p className="text-sm">&copy; {new Date().getFullYear()} Wolkite Prison Management. All rights reserved.</p>
  </footer>
</div>
  );
};

export default VisitorRegister;
