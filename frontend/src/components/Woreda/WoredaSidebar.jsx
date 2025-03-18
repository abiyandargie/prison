

import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaExclamationCircle,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";

const WoredaSidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h3 className="text-center font-pacific">Wolkite Prison MS</h3>
      </div>

      <NavLink
        to="/woreda-dashboard"
        className={({ isActive }) =>
          `${
            isActive ? "bg-teal-600" : ""
          } flex items-center space-x-4 py-2.5 px-4 rounded`
        }
        end
      >
        <FaTachometerAlt />
        <span>Dashboard</span>
      </NavLink>

      <NavLink
        to="/woreda-dashboard/inmates"
        className={({ isActive }) =>
          `${
            isActive ? "bg-teal-600" : ""
          } flex items-center space-x-4 py-2.5 px-4 rounded`
        }
        end
      >
        <FaUsers />
        <span>Inmates</span>
      </NavLink>


      <NavLink
        to="/woreda-dashboard/setting"
        className={({ isActive }) =>
          `${
            isActive ? "bg-teal-600" : ""
          } flex items-center space-x-4 py-2.5 px-4 rounded`
        }
      >
        <FaCogs />
        <span>Account Settings</span>
      </NavLink>
    </div>
  );
};

export default WoredaSidebar;
