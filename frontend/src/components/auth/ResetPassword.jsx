import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import axiosInstance from '../../utils/axiosInstance';

function ResetPassword() {
  const navigate = useNavigate();
  const { id, token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  console.log("User ID:", id, "Token:", token); // Debugging

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.'); // Show error toast
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/user/reset/${id}/${token}`,
        { password }
      );

      if (response.data.success) {
        toast.success('Password changed successfully!'); // Show success toast
        navigate("/"); // Redirect to the home page after success
      } else {
        toast.error('Error changing password. Please try again.'); // Error toast
      }
    } catch (error) {
      toast.error('Error changing password. Please try again.'); // Show error toast if axios request fails
      console.error("Axios Error:", error);
    }
  };

  return (
    <div className="bg-gray-200 w-screen h-screen flex flex-col">
      <header className="bg-green-600 text-white text-center py-4">
        <h1 className="text-xl font-bold">Welcome Wolkite Prison Management</h1>
      </header>
    <div className=" h-[90vh] flex justify-center items-center">
      <div className="flex flex-col items-center justify-center mx-auto w-[50%] bg-white p-4">
        <h2 className="text-sm md:text-2xl font-bold ">Reset Password</h2>
        <form className="flex flex-col justify-center" onSubmit={onSubmitHandler}>
          <label htmlFor="password" className="p-2 text-sm md:text-xl ">New Password</label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="*******"
            className="p-2  outline-green-400 border border-black"
          />
          <label htmlFor="confirm-password" className="p-2 text-xl">Confirm Password</label>
          <input
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="*******"
            className="p-2  outline-green-400 border border-black"
          />
          <button
            type="submit"
            className="p-2 bg-green-500 my-4 rounded-lg  mx-auto font-semibold text-black text-sm md:text-lg "
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
    <footer className="bg-gray-800 text-white text-center py-4">
    <p className="text-sm">&copy; {new Date().getFullYear()} Wolkite Prison Management. All rights reserved.</p>
  </footer>
</div>
  );
}

export default ResetPassword;
