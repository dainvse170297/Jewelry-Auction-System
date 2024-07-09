import React from "react";

export { ValuationRequestLabel };

const ValuationRequestLabel = ({ status }) => {
  let labelStyle = {};
  let label = "";
  console.log("status", status);
  switch (status) {
    case "CANCELED":
      labelStyle = { backgroundColor: "#eb2f06", color: "white" };
      label = "Canceled";
      break;
    case "MANAGER_APPROVED":
      labelStyle = { backgroundColor: "green", color: "white" };
      label = "Manager Approved";
      break;
    case "MEMBER_ACCEPTED":
      labelStyle = { backgroundColor: "blue", color: "white" };
      label = "Member Accepted";
      break;
    case "PENDING_MANAGER_APPROVAL":
      labelStyle = { backgroundColor: "yellow", color: "black" };
      label = "Pending Manager Approval";
      break;
    case "PENDING_MEMBER_ACCEPTANCE":
      labelStyle = { backgroundColor: "orange", color: "black" };
      label = "Pending Member Acceptance";
      break;
    case "PRELIMINARY_VALUATED":
      labelStyle = { backgroundColor: "purple", color: "white" };
      label = "Preliminary Valuated";
      break;
    case "PRODUCT_RECEIVED":
      labelStyle = { backgroundColor: "gray", color: "white" };
      label = "Product Received";
      break;
    case "REQUESTED":
      labelStyle = { backgroundColor: "#78e08f", color: "white" };
      label = "Accepted";
      break;
    default:
      labelStyle = { backgroundColor: "black", color: "white" };
      label = "Unknown Status";
      break;
  }

  return (
    <div className="mx-3 p-2" style={labelStyle}>
      {status}
    </div>
  );
};
