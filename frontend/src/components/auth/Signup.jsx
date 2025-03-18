import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Password from "../Password";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

function Signup() {
  const navigate = useNavigate();
  const amharicLabel = {
    h1: "አዲስ መግቢያ ይፍጠሩ",
    fullname: "ሙሉ ስም",
    email: "ኢሜይል",
    password: "አዲስ ይለፍ ቃል",
    confirmPassword: "ይለፍ ቃል ያረጋግጡ",
    button: "ይፍጠሩ",
    login: "ይግቡ",
  };
  const englishLabel = {
    h1: "Sign up",
    fullname: "Full Name",
    email: "Email",
    password: "New Password",
    confirmPassword: "Confirm Password",
    button: "Create",
    login: "Already have an account? ",
  };

  const initialUser = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [user, setUser] = useState(initialUser);
  const [label, setLabel] = useState(englishLabel);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    setShowButton(!user.fullname && !user.email && !user.password);
  }, [user]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUser = async(e) => {
    e.preventDefault();
    if (!user.email || !user.fullname || !user.password) {
      alert("All fields are required!");
      return;
    }
    try {
      const response = await axiosInstance.post('/user/create-account', {
          fullName: name,
          email,
          role:"visitor",
          password,
      });

      console.log(response); // Log response data for debugging

      if (response) {
          localStorage.setItem("token", response.data.accessToken);
          toast.success("User Registred Successfully !");
          navigate('/login');
      }
  } catch (error) {
      console.error("Error during signup:", error); // Log error details
      if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
      } else {
          setError("An unexpected error occurred. Please try again.");
      }
  } finally {
      setLoading(false); // Reset loading state
  }
    
    setUser(initialUser);
  };

  return (
    <div className="bg-gray-500 w-screen h-screen relative ">
      <div className="flex flex-col items-center justify-center mx-auto w-[30%] border mt-8 pb-8 bg-white absolute left-[30%] top-[10%] rounded shadow-lg">
        <h1 className="text-2xl p-2 mt-8 font-bold">{label.h1}</h1>
        <form
          className="flex flex-col w-full mx-auto justify-center items-center"
          onSubmit={handleUser}
        >
          <div className=" flex justify-center items-center w-[80%] m-2 ">
            <input
              type="text"
              name="fullname"
              placeholder={label.fullname}
             className="px-3 py-2 border w-[90%] mb-2 mr-0 "
              value={user.fullname}
              onChange={handleChange}
            />
             <p className="border p-3 ml-0 mb-2"> <FaUser/></p>
          </div>
          <div className=" flex justify-center items-center w-[80%] m-2 ">
            <input
              type="email"
              name="email"
              placeholder={label.email}
             className="px-3 py-2 border w-[90%] mb-2 mr-0 "
              value={user.email}
              onChange={handleChange}
            />
             <p className="border p-3 ml-0 mb-2"> <FaUser/></p>
          </div>
          <div className=" flex justify-center items-center w-[80%] mb-2 ">
            <Password
              placeholder={label.password}
              value={user.password}
              handleChange={handleChange}
            />
             <p className="border p-3 ml-0">
                    <FaLock />
                    </p>
          </div>
          <div className=" flex justify-center items-center w-[80%] m-2 ">
            <input
              type="password"
              name="confirmPassword"
              placeholder={label.confirmPassword}
            className="px-3 py-2 border w-[90%] mb-2 mr-0 "
              value={user.confirmPassword}
              onChange={handleChange}
            />
             <p className="border p-3 mb-2 ml-0">
                    <FaLock />
                    </p>
          </div>

          <button
            type="submit"
            className={`py-1.5 px-2 ${
              user.fullname && user.email && user.password
                ? "bg-blue-500"
                : "bg-gray-300 cursor-not-allowed"
            } m-2 w-[30%] text-white text-xl font-semibold rounded`}
            disabled={!user.fullname || !user.email || !user.password}
          >
            {label.button}
          </button>
        </form>
        <button onClick={() => navigate("/login")} className={`text-xl`}>
          {label.login}
          <span className=" text-purple-600">Login</span>
        </button>
      </div>
    </div>
  );
}

export default Signup;
