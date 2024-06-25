import React, { useEffect, useState } from "react";
import { Outlet, Route, useNavigate } from "react-router-dom";
const PrivateRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (!session) navigate("/login");
  }, []);

  return (
    <>
      {" "}
      <Outlet />
    </>
  );
};

export default PrivateRoute;
