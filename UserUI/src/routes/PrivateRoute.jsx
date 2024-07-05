import React from "react";
import CreateValuation from "../component/valuation_request/create/CreateValuation";
import CreateFinancialProofRequest from "../component/FinancialProof/CreateFinancialProofRequest";
import Profile from "../component/profile/Profile";

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
];

export default privateRoutes;
