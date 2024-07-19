import React from "react";
import FinancialProofRequestIcon from "@mui/icons-material/RequestQuote";
import SetupJewelryIcon from "@mui/icons-material/Diamond";
import ValuationRequestIcon from "@mui/icons-material/ContactMail";
import WaitingToDeliverIcon from "@mui/icons-material/LocalShipping";
import { Link } from "react-router-dom";
const navigation = [
  {
    name: "Valuation Request",
    icon: ValuationRequestIcon,
    href: "/valuation-request",
  },
  {
    name: "Financial Request",
    icon: FinancialProofRequestIcon,
    href: "/financial-request",
  },
  {
    name: "Set Up Jewelry",
    icon: SetupJewelryIcon,
    href: "/valuation-request/received",
  },
  {
    name: "Waiting To Deliver",
    icon: WaitingToDeliverIcon,
    href: "/auction/purchased-lot",
  },
];

const TaskButton = () => {
  return (
    <>
      {navigation.map((item, index) => (
        <div key={index} className="col-3">
          <Link to={item.href} className="card">
            <div className="card-body">
              <div className="d-flex justify-content-center">
                {React.createElement(item.icon)} {/* Corrected line */}
              </div>
              <div className="d-flex justify-content-center">{item.name}</div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};
export default TaskButton;
