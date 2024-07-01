import React from "react";
import Dashboard from "../component/dashboard/Dashboard";
import Setting from "../component/manager/SystemSetting";
import UserManage from "../component/manager/UserManage";
import AuctionSessionList from "../component/auction-session/AuctionSessionList";
import CreateAuction from "../component/manager/CreateAuction";
import { ReadyLots } from "../component/lots/LotList";
import { VIPFinancialProofRequestList } from "../component/financial-proof-request/FinancialProofRequestList";
import { FinancialProofRequestList } from "../component/financial-proof-request/FinancialProofRequestList";
import AddLotToSession from "../component/manager/Session/AddLotToSession";
import {
  AllValuationRequestList,
  PendingApprovalList,
} from "../component/valuation-request/AllValuationRequestList";
import PublicCreatedSession from "../component/manager/Session/PublicCreatedSession";
import { ViewPurchasedLot } from "../component/manager/Lots/ViewPurchasedLot";

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
    path: "/valuation-request/pending-approval",
    element: <PendingApprovalList />,
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
  {
    path: "/add-session/:id",
    element: <AddLotToSession />,
  },
  {
    path: "/sessions/created",
    element: <PublicCreatedSession />,
  },
  {
    path: "/auction/delivered-lots",
    element: <ViewPurchasedLot />,
  },
];

export default ManagerRoutes;
