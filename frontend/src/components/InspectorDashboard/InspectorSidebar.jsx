import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, setSidebarState } from "../../redux/sidebarSlice";
import { FaBars, FaBuilding, FaCogs, FaTachometerAlt, FaUsers } from "react-icons/fa";

const InspectorSidebar = () => {
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
            to="/inspector-dashboard"
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
            to="/inspector-dashboard/prisons"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg hover:bg-teal-600 transition-colors ${
                isActive ? "bg-teal-600" : ""
              } ${isCollapsed ? "justify-center" : "justify-start"}`
            }
            end
          >
            <FaUsers className="h-6 w-6" />
            {!isCollapsed && <span className="ml-3">Prisons</span>}
          </NavLink>

          <NavLink
            to="/inspector-dashboard/notices"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg hover:bg-teal-600 transition-colors ${
                isActive ? "bg-teal-600" : ""
              } ${isCollapsed ? "justify-center" : "justify-start"}`
            }
          >
            <FaBuilding className="h-6 w-6" />
            {!isCollapsed && <span className="ml-3">Manage Notices</span>}
          </NavLink>

          <NavLink
            to="/inspector-dashboard/settings"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg hover:bg-teal-600 transition-colors ${
                isActive ? "bg-teal-600" : ""
              } ${isCollapsed ? "justify-center" : "justify-start"}`
            }
          >
            <FaCogs className="h-6 w-6" />
            {!isCollapsed && <span className="ml-3">Settings</span>}
          </NavLink>
          <NavLink
  to="/inspector-dashboard/homepage-settings"
  className={({ isActive }) =>
    `flex items-center p-2 rounded-lg hover:bg-teal-600 transition-colors ${
      isActive ? "bg-teal-600" : ""
    }`
  }
>
  <FaCogs className="h-6 w-6" />
  {!isCollapsed && <span className="ml-3">Homepage Settings</span>}
</NavLink>

        </nav>
      </div>
    </>
  );
};

export default InspectorSidebar;
