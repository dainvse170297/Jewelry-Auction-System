import React from "react";
import LiveLotDetail from "../component/auction-session/live-lot/LiveLotDetail";
import LiveAuctionSessionDetail from "../component/auction-session/live-session/LiveAuctionSessionDetail";
import CreateFinancialProofRequest from "../component/FinancialProof/CreateFinancialProofRequest";
import NotificationList from "../component/notification/NotificationList";
import CreateValuation from "../component/valuation_request/create/CreateValuation";
import CheckOut from "../component/checkout/CheckOut";
import CheckOutDetail from "../component/checkout/CheckOutDetail";
import PaymentCallback from "../component/checkout/PaymentCallback";
import PaymentSuccess from "../component/checkout/PaymentSuccess";
import PaymentFailure from "../component/checkout/PaymentFailure";
import ValuationRequestDetail from "../component/profile/valuation-request/ValuationRequestDetail";
import MyValuationRequest from "../component/profile/valuation-request/MyValuationRequest";
import NewProfile from "../component/profile/NewProfile";
import NewProfileDetail from "../component/profile/ProfileDetail/NewProfileDetail";
import ViewFinancialProof from "../component/profile/FinancialProof/ViewFinancialProof";
import ChangePassword from "../component/profile/ChangePassword/ChangePassword";
import AuctionRegisterHistoryList from "../component/profile/AuctionRegisterHistory/AuctionRegisterHistoryList";
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
    element: <NewProfile />,
    children: [
      {
        path: "",
        element: <NewProfileDetail />,
      },
      {
        path: "valuation-request",
        element: <MyValuationRequest />,
      },
      {
        path: "financial-proof",
        element: <ViewFinancialProof />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
      {
        path: "auction-register",
        element: <AuctionRegisterHistoryList />,
      },
    ],
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
  },
  {
    path: "/CheckOut",
    element: <CheckOut />,
  },
  {
    path: "/checkout-detail",
    element: <CheckOutDetail />,
  },
  {
    path: "/payment-callback",
    element: <PaymentCallback />,
  },
  {
    path: "/payment-success",
    element: <PaymentSuccess />,
  },
  {
    path: "/payment-failure",
    element: <PaymentFailure />,
  },
  {
    path: "/valuation-request/:id",
    element: <ValuationRequestDetail />,
  },
];

export default privateRoutes;
