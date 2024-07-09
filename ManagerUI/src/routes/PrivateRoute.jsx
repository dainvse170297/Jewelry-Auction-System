import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoute = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.auth) navigate("/login");
  }, [user]);

  return user.auth ? <Outlet /> : null;
};

export default PrivateRoute;
