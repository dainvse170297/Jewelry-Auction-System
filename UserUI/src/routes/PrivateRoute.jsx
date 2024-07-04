import React from "react";
import CreateValuation from "../component/valuation_request/create/CreateValuation";
import CreateFinancialProofRequest from "../component/FinancialProof/CreateFinancialProofRequest";

const privateRoutes = [
  {
    path: "/create-valuation",
    element: <CreateValuation />,
  },
  {
    path: "/create-financial-proof",
    element: <CreateFinancialProofRequest />,
  },
];

export default privateRoutes;
