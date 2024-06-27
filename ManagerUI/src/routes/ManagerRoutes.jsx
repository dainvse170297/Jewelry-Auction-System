import React from "react";
import AllValuationRequestList from "../component/valuation-request/AllValuationRequestList";
import AuctionAssigned from "../component/staff/AuctionAssigned";
import Dashboard from "../component/dashboard/Dashboard";
import Setting from "../component/manager/SystemSetting";
import UserManage from "../component/manager/UserManage";

const ManagerRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/valuation-request",
    element: <AllValuationRequestList />,
  },
  {
    path: "/user-manage",
    element: <UserManage />,
  },
  {
    path: "/setting",
    element: <Setting />,
  },
  {
    path: "/auction",
    element: <AuctionAssigned />,
  },
];

export default ManagerRoutes;
