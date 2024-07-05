import React from "react";
import {
  AllValuationRequestList,
  ProductReceivedList,
} from "../component/valuation-request/AllValuationRequestList";
import AuctionAssigned from "../component/staff/AuctionAssigned";
import { FinancialProofRequestList } from "../component/financial-proof-request/FinancialProofRequestList";
import { ViewPurchasedLot } from "../component/staff/ViewPurchasedLot";
import SetupProductInfo from "../component/staff/SetupProductInfo";
import ValuationRequestDetail from "../component/staff/SetupProductInfo";
import ValuationRequestProductReceivedList from "../component/staff/ValuationRequestProductReceivedList";

const StaffRoutes = [
  {
    path: "/valuation-request",
    element: <AllValuationRequestList />,
  },
  {
    path: "/valuation-request/received",
    element: <ProductReceivedList />,
  },
  {
    path: "/financial-request",
    element: <FinancialProofRequestList />,
  },
  {
    path: "/auction",
    element: <AuctionAssigned />,
  },

  {
    path: "/auction/deliver",
    element: <ViewPurchasedLot />,
  },
  {
    path: "/valuation-request/product-received/confirm/:id",
    element: <SetupProductInfo />,
  },
  {
    path: "/product/pending-send",
    element: <ValuationRequestDetail />,
  },
];

export default StaffRoutes;
