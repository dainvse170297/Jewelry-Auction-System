import React from "react";
import Dashboard from "../component/dashboard/Dashboard";
import Setting from "../component/manager/SystemSetting";
import StaffMange from "../component/account/StaffMange";
import AuctionSessionList from "../component/auction-session/AuctionSessionList";
import CreateAuction from "../component/manager/CreateAuction";
import { ReadyLots } from "../component/lots/LotList";
import { FinancialProofRequestList } from "../component/financial-proof-request/FinancialProofRequestList";
import AddLotToSession from "../component/manager/Session/AddLotToSession";
import {
  AllValuationRequestList,
  PendingApprovalList,
  ProductReceivedList,
} from "../component/valuation-request/AllValuationRequestList";
import PublicCreatedSession from "../component/manager/Session/PublicCreatedSession";
import { ViewDeliveredLot } from "../component/lots/ViewDeliveredLot";
import { ViewPurchasedLot } from "../component/lots/ViewPurchasedLot";
import PaidList from "../component/manager/AuctionRegister/PaidList";
import SetupProductInfo from "../component/product/SetupProductInfo";
import Export from "../component/export/Export";
import MemberManage from "../component/account/MemberManage";
import TransactionHistory from "../component/manager/transaction/TransactionHistory";
import AllLots from "../component/manager/Lot/AllLots";

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
    path: "/staff-manage",
    element: <StaffMange />,
  },
  {
    path: "/setting",
    element: <Setting />,
  },
  {
    path: "/export",
    element: <Export />,
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
    path: "/auction/purchased-lot",
    element: <ViewPurchasedLot />,
  },
  {
    path: "/auction/delivered-lot",
    element: <ViewDeliveredLot />,
  },

  {
    path: "/paid-list",
    element: <PaidList />,
  },
  {
    path: "/transaction-history",
    element: <TransactionHistory />,
  },
  {
    path: "/valuation-request/received",
    element: <ProductReceivedList />,
  },
  {
    path: "/valuation-request/product-received/confirm/:id",
    element: <SetupProductInfo />,
  },
  {
    path: "/user-manage",
    element: <MemberManage />,
  },
  {
    path: "/lots",
    element: <AllLots />,
  },
];

export default ManagerRoutes;
