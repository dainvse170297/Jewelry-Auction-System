import React from "react";
import AllValuationRequestList from "../component/valuation-request/AllValuationRequestList";
import AuctionAssigned from "../component/staff/AuctionAssigned";
import { FinancialProofRequestList } from "../component/financial-proof-request/FinancialProofRequestList";

const StaffRoutes = [
  {
    path: "/valuation-request",
    element: <AllValuationRequestList />,
  },
  {
    path: "/financial-request",
    element: <FinancialProofRequestList />,
  },
  {
    path: "/auction",
    element: <AuctionAssigned />,
  },
];

export default StaffRoutes;
