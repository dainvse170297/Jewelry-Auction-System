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
  ProductReceivedList,
} from "../component/valuation-request/AllValuationRequestList";
import PublicCreatedSession from "../component/manager/Session/PublicCreatedSession";
import { ViewPurchasedLot } from "../component/manager/Lots/ViewPurchasedLot";
import PaidList from "../component/manager/AuctionRegister/PaidList";
import SetupProductInfo from "../component/product/SetupProductInfo";

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
    element: <FinancialProofRequestList />,
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
  {
    path: "/paid-list",
    element: <PaidList />,
  },
  {
    path: "/valuation-request/received",
    element: <ProductReceivedList />,
  },
  {
    path: "/valuation-request/product-received/confirm/:id",
    element: <SetupProductInfo />,
  },
];

export default ManagerRoutes;
