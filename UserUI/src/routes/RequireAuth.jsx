import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const isLoggedIn = () => {
  return Boolean(localStorage.getItem("account"));
};

const RequireAuth = () => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default RequireAuth;
