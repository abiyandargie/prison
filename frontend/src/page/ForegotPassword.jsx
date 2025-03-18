import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FaUser } from "react-icons/fa";
function ForegotPassword() {
  const navigate = useNavigate();
  const amharicLabel = {
    h1: "መግቢያ",
    email: "ኢሜይል",
    password: "ይለፍ ቃል",
    login: "ግባ",
    createAccount: "አዲስ መግቢያ ፍጠር",
  };
  const englishLabel = {
    h1: "Foregot Password",
    email: "Email",
    password: "Password",
    login: "Submit",
    
  };

  const initialUser = {
    email: "",
    password: "",
  };
  const [label, setLabel] = useState(englishLabel);
  const [user, setUser] = useState(initialUser);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User logged in:", user);
    // Verify user credentials and navigate
    navigate("/dashboard");
  };

  return (
    <div className="bg-gray-500 w-screen h-screen relative ">
    <div className="flex flex-col items-center justify-center mx-auto w-[30%] border shadow-lg mt-8 pb-3 absolute left-[30%] top-[20%] bg-white rounded">
      <h1 className="text-2xl p-1 mt-8 font-bold">{label.h1}</h1>
      <form
        className="flex flex-col w-full mx-auto justify-center items-center"
        onSubmit={handleSubmit}
      >  
      <div className=" flex justify-center items-center w-[80%] m-2 ">
      <input
          type="email"
          name="email"
          placeholder={label.email}
          value={user.email}
          onChange={handleChange}
          className="px-3 py-2 border w-[90%] m-2 mr-0 "
          required
        />
        <p className="border p-3 ml-0"> <FaUser/></p>
       
      </div>
        <button
          type="submit"
          className={`py-1.5 px-2 ${user.email ? 'bg-blue-500' : 'bg-gray-300 cursor-not-allowed'} m-2 w-[30%] text-white text-xl rounded  `}
          disabled={!user.email || !user.password}
        >
          {label.login}
        </button>
      </form>
      <button
        onClick={() => navigate("/")}
        className="text-xl text-gray-950"
      >
        <span className=" text-purple-600">Cancel</span>
      </button>
    </div>
    </div>
  );
}

export default ForegotPassword;