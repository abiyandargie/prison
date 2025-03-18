import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { LuPhoneCall } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import axiosInstance from "../../utils/axiosInstance";

function VisitorInformation() {
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
    h1: "Fill Information",
    fullname: "Visitor's Full Name",
    inmate: "Inmate",
    password: "New Password",
    confirmPassword: "Confirm Password",
    button: "Save",
    login: "Already have an account? ",
  };
  const getVisitor=()=>{
    const response=axiosInstance.get("/")
  }

  const initialUser = {
    inmate:"",
    fullname: "",
    relation: "",
    number: "",
    date:''
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

  const handleUser = (e) => {
    e.preventDefault();
    if (!user.email || !user.fullname || !user.password) {
      alert("All fields are required!");
      return;
    }
    navigate("/list");
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
              name="inmate"
              placeholder={label.inmate}
             className="px-3 py-2 border w-[90%] mb-2 mr-0 "
              value={user.inmate}
              onChange={handleChange}
            />
             <p className="border p-3 ml-0 mb-2"> <FaUser/></p>
          </div>
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
              type="text"
              name="relation"
              placeholder="Relation"
             className="px-3 py-2 border w-[90%] mb-2 mr-0 "
              value={user.relation}
              onChange={handleChange}
            />
             <p className="border p-3 ml-0 mb-2"> <FaUsers/></p>
          </div>
          <div className=" flex justify-center items-center w-[80%] m-2 ">
            <input
              type="text"
              name="number"
              placeholder="Phone Number"
             className="px-3 py-2 border w-[90%] mb-2 mr-0 "
              value={user.number}
              onChange={handleChange}
            />
             <p className="border p-3 ml-0 mb-2"> <LuPhoneCall/></p>
          </div>
          <div className=" flex justify-center items-center w-[80%] m-2 ">
            <input
              type="date"
              name="date"
              placeholder="Date"
             className="px-3 py-2 border w-[90%] mb-2 mr-0 "
              value={user.date}
              onChange={handleChange}
            />
             <p className="border p-3 ml-0 mb-2"> <SlCalender/></p>
          </div>
         <div className="flex">
          <button
            type="submit"
            className={`py-1.5 px-2 ${
              user.fullname && user.inmate && user.number&&user.relation
                ? "bg-blue-500 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            } m-2 w-[50%] text-white text-xl font-semibold rounded mr-4`}
            disabled={!user.fullname || !user.email || !user.password}
          >
            {label.button}
          </button>
        <button>
        <Link to="/visitor-dash" className=" bg-red-600 text-white px-3 py-2 rounded">
          
          Cancel
        </Link>
        </button>
        </div>
        </form>
      </div>
    </div>
  );
}

export default VisitorInformation;
