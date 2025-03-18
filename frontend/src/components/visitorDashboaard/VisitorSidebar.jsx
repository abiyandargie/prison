import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaCalendarCheck,
  FaHistory,
  FaUserCog,
} from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const VisitorSidebar = () => {

    // const {user} = useAuth()

  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      {/* Header */}
      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h3 className="text-center font-bold">Wolkite Prison MS</h3>
      </div>

      {/* Dashboard */}
      <NavLink
        to="/visitor-dashboard"
        className={({ isActive }) =>
          `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`
        }
        end
      >
        <FaHome />
        <span>Dashboard</span>
      </NavLink>

      {/* Schedule Visit */}
      <NavLink
        to="/visitor-dashboard/schedule"
        className={({ isActive }) =>
          `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`
        }
        end
      >
        <FaCalendarCheck />
        <span>Schedule Visit</span>
      </NavLink>

      {/* Visit History */}
      <NavLink
        to={`/visitor-dashboard/visit-history`}// /${user._id}  to fetch visitor detail on as police officcer page based on id based on the id so rewrite the poicce officer visitor side bar implementation
        className={({ isActive }) =>
          `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`
        }
      >
        <FaHistory />
        <span>Visit History</span>
      </NavLink>

      {/* Profile Settings */}
      <NavLink
        to="/visitor-dashboard/setting"
        className={({ isActive }) =>
          `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`
        }
      >
        <FaUserCog />
        <span>Profile Settings</span>
      </NavLink>
    </div>
  );
};

export default VisitorSidebar;
