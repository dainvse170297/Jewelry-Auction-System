import React from "react";
import LiveLotDetail from "../component/auction-session/live-lot/LiveLotDetail";
import LiveAuctionSessionDetail from "../component/auction-session/live-session/LiveAuctionSessionDetail";
import CreateFinancialProofRequest from "../component/FinancialProof/CreateFinancialProofRequest";
import NotificationList from "../component/notification/NotificationList";
import Profile from "../component/profile/Profile";
import CreateValuation from "../component/valuation_request/create/CreateValuation";

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
  {
    path: "/live-lot-detail/:id",
    element: <LiveLotDetail />,
  },
  {
    path: "/notify",
    element: <NotificationList />,
  }
];

export default privateRoutes;
