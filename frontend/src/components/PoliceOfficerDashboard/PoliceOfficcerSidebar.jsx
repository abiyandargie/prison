import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, setSidebarState } from "../../redux/sidebarSlice";
import { FaBars, FaBuilding, FaCogs, FaExclamationCircle, FaTachometerAlt, FaUsers, FaCalendarAlt } from "react-icons/fa";

const PoliceOfficerSidebar = () => {
  const dispatch = useDispatch();
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);

  useEffect(() => {
    const handleResize = () => {
      dispatch(setSidebarState(window.innerWidth < 768)); // Auto-collapse on small screens
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return (
    <>
      {/* Hamburger Menu for Small Screens */}
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="md:hidden fixed top-4 left-4 z-[9999] p-2 bg-teal-600 text-white hover:bg-teal-700 transition-colors shadow-lg rounded"
      >
        <FaBars className="text-2xl" />
      </button>

      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white h-screen fixed left-0 top-0 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-16" : "w-64"
        } z-30 shadow-lg`}
      >
        {/* Sidebar Header */}
        <div className="bg-teal-600 h-12 flex items-center justify-center">
          {!isCollapsed && <h3 className="text-center font-pacific truncate">Wolkite Prison MS</h3>}
        </div>

        {/* Sidebar Navigation Links */}
        <nav className="mt-4 space-y-1 px-2">
          <NavLink
            to="/policeOfficer-dashboard"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg hover:bg-teal-600 transition-colors ${
                isActive ? "bg-teal-600" : ""
              } ${isCollapsed ? "justify-center" : "justify-start"}`
            }
            end
          >
            <FaTachometerAlt className="h-6 w-6" />
            {!isCollapsed && <span className="ml-3">Dashboard</span>}
          </NavLink>

          <NavLink
            to="/policeOfficer-dashboard/visitors"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg hover:bg-teal-600 transition-colors ${
                isActive ? "bg-teal-600" : ""
              } ${isCollapsed ? "justify-center" : "justify-start"}`
            }
          >
            <FaUsers className="h-6 w-6" />
            {!isCollapsed && <span className="ml-3">Visitors</span>}
          </NavLink>

          <NavLink
            to="/policeOfficer-dashboard/parole"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg hover:bg-teal-600 transition-colors ${
                isActive ? "bg-teal-600" : ""
              } ${isCollapsed ? "justify-center" : "justify-start"}`
            }
          >
            <FaBuilding className="h-6 w-6" />
            {!isCollapsed && <span className="ml-3">Parole</span>}
          </NavLink>

          <NavLink
            to="/policeOfficer-dashboard/incident"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg hover:bg-teal-600 transition-colors ${
                isActive ? "bg-teal-600" : ""
              } ${isCollapsed ? "justify-center" : "justify-start"}`
            }
          >
            <FaExclamationCircle className="h-6 w-6" />
            {!isCollapsed && <span className="ml-3">Incident</span>}
          </NavLink>

          <NavLink
            to="/policeOfficer-dashboard/reports"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg hover:bg-teal-600 transition-colors ${
                isActive ? "bg-teal-600" : ""
              } ${isCollapsed ? "justify-center" : "justify-start"}`
            }
          >
            <FaCalendarAlt className="h-6 w-6" />
            {!isCollapsed && <span className="ml-3">Reports</span>}
          </NavLink>

          <NavLink
            to="/policeOfficer-dashboard/setting"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg hover:bg-teal-600 transition-colors ${
                isActive ? "bg-teal-600" : ""
              } ${isCollapsed ? "justify-center" : "justify-start"}`
            }
          >
            <FaCogs className="h-6 w-6" />
            {!isCollapsed && <span className="ml-3">Account Settings</span>}
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default PoliceOfficerSidebar;