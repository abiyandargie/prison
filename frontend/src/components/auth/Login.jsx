import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FaUser, FaLock, FaArrowLeft } from "react-icons/fa";
import Password from "../Password";
import { Link } from "react-router";
import axiosInstance from "../../utils/axiosInstance";
import { useDispatch } from 'react-redux';
import { setUser } from "../../redux/userSlice.js";

function Login() {
  const [error,setError]=useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const initialUser = {
    email: "",
    password: "",
  };

  const [user, setUsers] = useState(initialUser);
  const [label] = useState({
    h1: "Login",
    email: "Email",
    password: "Password",
    login: "Login",
    createAccount: "If you are a Visitor, ",
  });

  const handleChange = (e) => {
    setUsers({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/user/login", {
        email: user.email,
        password: user.password,
      });
      
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        dispatch(setUser(response.data.userInfo));

        if (response.data.userInfo.isactivated) {
          switch (response.data.userInfo.role) {
            case "admin":
              navigate("/admin-dashboard");
              break;
            case "visitor":
              navigate("/visitor-dashboard");
              break;
            case "police-officer":
              navigate("/policeOfficer-dashboard");
              break;
            case "inspector":
              navigate("/inspector-dashboard");
              break;
            case "security":
              navigate("/securityStaff-dashboard");
              break;
              case "court":
                navigate("/court-dashboard");
                break;
            default:
              navigate("/login");
          }
        } else {
          navigate("/block");
        }
      }
    } catch (error) {
     setError(error.response?.data?.message || "Login error, try again.");
    }
  };

  return (
    <div className="bg-gray-200 w-screen h-screen flex flex-col">
      <header className="bg-green-600 text-white text-center py-4">
        <h1 className="text-xl font-bold">Welcome Wolkite Prison Management</h1>
      </header>
      
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white w-full max-w-md rounded-lg shadow-md p-8">
           <button 
                  onClick={() => navigate('/')} 
                  className="mb-4 flex items-center text-white bg-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                >
                  <FaArrowLeft className="mr-2" /> Back
                </button>
          <h1 className="text-2xl font-bold text-center mb-6">{label.h1}</h1>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <p className="text-red-500 py-2 text-center font-semibold">{error&&error}</p>
            <div className="relative mb-4">
              <FaUser className="absolute left-3 top-2.5 " />
              <input
                type="email"
                name="email"
                placeholder={label.email}
                value={user.email}
                onChange={handleChange}
                className="px-10 py-2 border border-black rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative mb-6">
              <FaLock className="absolute left-3 top-2.5 text-gray-500" />
              <Password
                placeholder={label.password}
                value={user.password}
                handleChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className={`py-2 px-4 bg-blue-500 text-white font-semibold rounded w-full 
                ${user.email && user.password ? '' : 'opacity-50 cursor-not-allowed'}`}
              disabled={!user.email || !user.password}
            >
              {label.login}
            </button>
            <Link to='/foregot-password' className="text-center text-blue-600 mt-4">
             Forgot Password?
            </Link>
          </form>
          <button
            onClick={() => navigate("/register")}
            className="mt-4 text-center w-full text-blue-600 font-semibold"
          >
            {label.createAccount} Register
          </button>
        </div>
      </main>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} Wolkite Prison Management. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Login;