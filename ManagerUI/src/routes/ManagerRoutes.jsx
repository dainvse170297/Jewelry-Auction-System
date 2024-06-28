import React from "react";
import AllValuationRequestList from "../component/valuation-request/AllValuationRequestList";
import AuctionAssigned from "../component/staff/AuctionAssigned";
import Dashboard from "../component/dashboard/Dashboard";
import Setting from "../component/manager/SystemSetting";
import UserManage from "../component/manager/UserManage";
import AuctionSessionList from "../component/auction-session/AuctionSessionList";
import CreateAuction from "../component/manager/CreateAuction";
import { ReadyLots } from "../component/lots/LotList";
import { VIPFinancialProofRequestList } from "../component/financial-proof-request/FinancialProofRequestList";
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
    element: <AuctionSessionList />,
  },
  {
    path: "/auction/create",
    element: <CreateAuction />,
  },
  {
    path: "/auction/ready-lots",
    element: <ReadyLots />,
  },
  {
    path: "/financial-request",
    element: <VIPFinancialProofRequestList />,
  },
];

export default ManagerRoutes;
