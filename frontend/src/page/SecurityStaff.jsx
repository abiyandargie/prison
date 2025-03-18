import React, { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { HiUserGroup } from "react-icons/hi";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa6";
import { FiFileText } from "react-icons/fi";
import {
  FaUserCheck,
  FaUserPlus,
  FaUsersCog,
  FaUserSlash,
} from "react-icons/fa";
import ListofUsers from "../components/Admin/ListofUsers";
import AdminDashboard from "../components/Admin/AdminDashboard";
import SystenmInformation from "../components/Admin/SystenmInformation";
import MyAccount from "../components/Admin/MyAccount";
import Issue from "../components/security/Issue";
import UpdateProfile from "../components/security/UpdateProfile";
import NewInmate from "../components/Visitor/security/NewInmate";
import { useNavigate } from "react-router";
function SecurityStaff() {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const [profiletoggle, setProfileToggle] = useState(true);
  const [inmatetoggle, setInmateToggle] = useState(true);

  const renderComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <AdminDashboard />;
      case "Create New":
        return <NewInmate />;
      case "issue":
        return <Issue />;
      case "All Users":
        return <ListofUsers />;
      case "My Profile":
        return <UpdateProfile />;
      case "System Information":
        return <SystenmInformation />;
      case "myAccount":
        return <MyAccount />;
      case "logout":
        navigate("/login");
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex">
      <div className="border-r w-1/6 p-3 bg-gray-950 h-screen fixed">
        <ul className="space-y-6 font-semibold text-white w-full">
          <li className="flex bg-gray-700">
            <div className="flex items-center justify-center mr-2">
              <div className="w-6 h-6 bg-slate-500 rounded-full"></div>
            </div>
            PMS
          </li>
          <li
            onClick={() => setActiveComponent("Dashboard")}
            className={`hover:bg-gray-300 cursor-pointer flex items-center border-b border-white ${
              activeComponent === "Dashboard" ? "bg-green-400" : ""
            }`}
          >
            <RxDashboard className="mr-2" size={20} /> Dashboard
          </li>
          <h2 className="text-xl font-semibold flex items-center">
            Profile{" "}
            <span className="ml-2">
              {profiletoggle ? (
                <FaAngleDown onClick={() => setProfileToggle(!profiletoggle)} />
              ) : (
                <FaAngleUp onClick={() => setProfileToggle(!profiletoggle)} />
              )}
            </span>
          </h2>
          <div className={`${profiletoggle ? "hidden" : ""} space-y-6`}>
            <li
              onClick={() => setActiveComponent("My Profile")}
              className={`hover:bg-gray-300 cursor-pointer flex items-center border-b border-white ${
                activeComponent === "My Profile" ? "bg-green-400" : ""
              }`}
            >
              <RxDashboard className="mr-2" size={20} /> Update Profile
            </li>
            <li
              onClick={() => setActiveComponent("issue")}
              className={`hover:bg-gray-300 cursor-pointer flex items-center border-b border-white ${
                activeComponent === "issue" ? "bg-green-400" : ""
              }`}
            >
              <FaUserPlus className="mr-2" size={20} /> Manage Issue
            </li>
          </div>
          <h2 className="text-xl font-semibold flex items-center">
            Manage Inmate{" "}
            <span className="ml-2">
              {inmatetoggle ? (
                <FaAngleDown onClick={() => setInmateToggle(!inmatetoggle)} />
              ) : (
                <FaAngleUp onClick={() => setInmateToggle(!inmatetoggle)} />
              )}
            </span>
          </h2>
          <div className={`${inmatetoggle ? "hidden" : ""} space-y-6`}>
            <li
              onClick={() => setActiveComponent("Create New")}
              className={`hover:bg-gray-300 cursor-pointer flex items-center border-b border-white ${
                activeComponent === "Create New" ? "bg-green-400" : ""
              }`}
            >
              <FaUserPlus className="mr-2" size={20} /> New Inmate
            </li>
            <li
              onClick={() => setActiveComponent("All Users")}
              className={`hover:bg-gray-300 cursor-pointer flex items-center border-b border-white ${
                activeComponent === "All Users" ? "bg-green-400 " : ""
              }`}
            >
              <HiUserGroup className="mr-2" size={20} /> Inmate List
            </li>
            {/* <li onClick={() => setActiveComponent("Active Users")} className={`hover:bg-gray-300 cursor-pointer flex items-center border-b border-white ${activeComponent === "Active Users" ? 'bg-green-400' : ''}`}>
            <FaUserCheck className="mr-2" size={20} /> Active Users
          </li> */}
            <li
              onClick={() => setActiveComponent("Blocked Users")}
              className={`hover:bg-gray-300 cursor-pointer flex items-center border-b border-white ${
                activeComponent === "Blocked Users" ? "bg-green-400" : ""
              }`}
            >
              <FiFileText className="mr-2" size={20} />
              Generate Report
            </li>
            <li
              onClick={() => setActiveComponent("Blocked Users")}
              className={`hover:bg-gray-300 cursor-pointer flex items-center border-b border-white ${
                activeComponent === "Blocked Users" ? "bg-green-400" : ""
              }`}
            >
              <FaUserSlash className="mr-2" size={20} />
              Transfer Prisoner
            </li>
            <li
              onClick={() => setActiveComponent("Blocked Users")}
              className={`hover:bg-gray-300 cursor-pointer flex items-center border-b border-white ${
                activeComponent === "Blocked Users" ? "bg-green-400" : ""
              }`}
            >
              <FiFileText className="mr-2" size={20} />
              Generate Clearance
            </li>
          </div>
          <li
            onClick={() => setActiveComponent("System Information")}
            className={`hover:bg-gray-300 cursor-pointer flex items-center border-b border-white ${
              activeComponent === "System Information" ? "bg-green-400" : ""
            }`}
          >
            <FaUsersCog className="mr-2" size={20} />
            Setting
          </li>
        </ul>
      </div>

      <div className="w-full ml-60">
        <div className="fixed shadow-lg border-b flex items-center py-3 w-full bg-neutral-50 space-x-96">
          <h3 className="font-semibold ml-2">
            Prison Management System Security Staff
          </h3>
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 bg-slate-500 rounded-full"></div>
            <p className="ml-3">
              Security Staff{" "}
              <select onChange={(e) => setActiveComponent(e.target.value)}>
                <option value=""></option>
                <option value="myAccount">My Account</option>
                <option value="logout">Logout</option>
              </select>
            </p>
          </div>
        </div>
        <div className="border m-2 mt-12 h-screen">{renderComponent()}</div>
      </div>
    </div>
  );
}

export default SecurityStaff;
