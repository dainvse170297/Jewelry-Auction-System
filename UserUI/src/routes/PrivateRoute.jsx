import React from "react";
import CreateValuation from "../component/valuation_request/create/CreateValuation";
import CreateFinancialProofRequest from "../component/FinancialProof/CreateFinancialProofRequest";
import Profile from "../component/profile/Profile";
import LiveAuctionSessionDetail from "../component/auction-session/live-session/LiveAuctionSessionDetail";
import CheckOut from "../component/checkout/CheckOut";
import CheckOutDetail from "../component/checkout/CheckOutDetail";
import PaymentCallback from "../component/checkout/PaymentCallback";
import PaymentSuccess from "../component/checkout/PaymentSuccess";
import PaymentFailure from "../component/checkout/PaymentFailure";

const privateRoutes = [
  {
    path: "/create-valuation",
    element: <CreateValuation />,
  },
  {
    path: "/create-financial-proof",
    element: <CreateFinancialProofRequest />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "live-session-detail/:id",
    element: <LiveAuctionSessionDetail />,
  },
];

export default privateRoutes;
