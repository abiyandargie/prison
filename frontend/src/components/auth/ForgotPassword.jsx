import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../utils/axiosInstance';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/user/forget', { email });
      if (res.data) {
        toast.success('Password reset link sent to your email!');
        setTimeout(() => {
          navigate('/'); 
        }, 3000);
      }
    } catch (err) {
      toast.error('Failed to send password reset link. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-200 w-screen h-screen flex flex-col">
    <header className="bg-green-600 text-white text-center py-4">
      <h1 className="text-xl font-bold">Welcome Wolkite Prison Management</h1>
    </header>


    <div className={` h-[90vh] flex justify-center items-center shadow-md`}>
      <div className="flex flex-col items-center justify-center mx-auto w-[50%] bg-white p-4">
        <h2 className="text-sm md:text-xl lg:text-2xl text-black">Forgot Password</h2>
        <div className="bg-slate-400 flex justify-start mx-auto p-2 rounded mt-3">
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
        <form className="flex flex-col justify-center w-[50%] " onSubmit={onSubmitHandler}>
          <label htmlFor="email" className="p-2 text-sm md:text-xl text-black ">Email</label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="p-2 w-[90%] outline-green-400 border bottom-2 border-black"
          />
          <button
            type="submit"
            className="p-2 bg-green-500 my-4 rounded-lg w-[50%] mx-auto font-semibold text-black text-sm md:text-xl "
          >
            Send
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
    <footer className="bg-gray-800 text-white text-center py-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} Wolkite Prison Management. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ForgotPassword;
