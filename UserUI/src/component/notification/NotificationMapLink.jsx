import React from "react";
import { GoToValuationRequestDetail } from "./NotifyAction";

const NotificationMap = ({ notification }) => {
  switch (notification.notifiableType) {
    case "VALUATION_REQUEST_SUCCESS":
      return <GoToValuationRequestDetail notification={notification} />;
    case "VALUATION_REQUEST_PRELIMINARY":
      return <GoToValuationRequestDetail notification={notification} />;
    case "VALUATION_REQUEST_PRODUCT_RECEIVED":
      return <GoToValuationRequestDetail notification={notification} />;
    case "FINAL_VALUATION":
      return <GoToValuationRequestDetail notification={notification} />;

    default:
      return null;
  }
};

export default NotificationMap;
