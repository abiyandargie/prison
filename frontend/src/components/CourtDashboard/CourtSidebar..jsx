import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, setSidebarState } from "../../redux/sidebarSlice";
import { FaBars, FaCogs, FaGavel, FaTachometerAlt, FaUsers } from "react-icons/fa";

const CourtSidebar = () => {
  const dispatch = useDispatch();
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      dispatch(setSidebarState(window.innerWidth < 768));
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return (
    <div>
      {/* Mobile Menu Button */}
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-teal-600 text-white hover:bg-teal-700 transition-colors"
      >
        <FaBars className="text-2xl" />
      </button>

      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white h-screen fixed left-0 top-0 overflow-y-auto transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-16" : "w-64"
        } z-40`}
      >
        {/* Sidebar Header */}
        <div className="bg-teal-600 h-12 flex items-center justify-center">
          {!isCollapsed && <h3 className="text-center font-bold">Wolkite Prison MS</h3>}
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 space-y-1 px-2">
          {[
            { to: "/court-dashboard", icon: <FaTachometerAlt />, label: "Dashboard", exact: true },
            { to: "/court-dashboard/parole", icon: <FaUsers />, label: "Parole Requests" },
            { to: "/court-dashboard/list", icon: <FaGavel />, label: "Manage Verdict" },
            { to: "/court-dashboard/settings", icon: <FaCogs />, label: "Settings" }
          ].map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              end={item.exact}  // Ensures only exact route matches
              className={({ isActive }) =>
                `relative flex items-center p-2 rounded-lg hover:bg-teal-600 transition-colors ${
                  isActive ? "bg-teal-600" : ""
                } ${isCollapsed ? "justify-center" : "justify-start"}`
              }
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              {item.icon}
              {!isCollapsed && <span className="ml-3">{item.label}</span>}

              {/* Tooltip when sidebar is collapsed */}
              {isCollapsed && hovered === index && (
                <span className="absolute left-16 bg-gray-700 text-white text-sm px-2 py-1 rounded-md shadow-md">
                  {item.label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default CourtSidebar;
