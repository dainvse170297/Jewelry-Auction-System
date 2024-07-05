import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const isLoggedIn = () => {
  return Boolean(localStorage.getItem("account"));
};

const RequireAuth = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;
