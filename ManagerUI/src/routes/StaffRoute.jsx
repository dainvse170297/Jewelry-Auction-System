import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";

const StaffRoute = () => {
  const [routes, setRoutes] = useState([
    {
      path: "staff/dashboard",
      element: <StaffFunction />,
    },
  ]);
  return <div>{/* Your code here */}</div>;
};

export default StaffRoute;
