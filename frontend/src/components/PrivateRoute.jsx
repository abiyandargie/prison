import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token"); // Check if token exists

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
