import React from "react";
import { AllValuationRequestList } from "../component/valuation-request/AllValuationRequestList";
import AuctionAssigned from "../component/staff/AuctionAssigned";
import { FinancialProofRequestList } from "../component/financial-proof-request/FinancialProofRequestList";
import { ViewPurchasedLot } from "../component/staff/ViewPurchasedLot";
import ValuationRequestList from "../component/staff/ValuationRequestProductReceivedList";
import ValuationRequestDetail from "../component/staff/ValuationRequestDetail";
const StaffRoutes = [
  {
    path: "/valuation-request",
    element: <AllValuationRequestList />,
  },
  {
    path: "/valuation-request/received",
    element: <ValuationRequestList />,
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
    element: <ValuationRequestDetail />,
  },
  {
    path: "/product/pending-send",
    element: <ValuationRequestDetail />,
  },
];

export default StaffRoutes;
