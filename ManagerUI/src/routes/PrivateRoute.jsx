import React, { useEffect, useState } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const PrivateRoute = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const session = sessionStorage.getItem("name");
    if (!session) navigate("/login");
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
