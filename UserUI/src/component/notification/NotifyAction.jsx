import React from "react";
import { Button } from "react-bootstrap";
import "./notify.scss";
import { Link } from "react-router-dom";

export { GoToValuationRequestDetail };

const handleReadNotification = async (notificationId) => {
  //console.log('notificationId ', notificationId);
  try {
    const response = await getReadNotify(notificationId);
    if (response) {
      window.location.reload();
    }
  } catch (error) {
    console.log("error", error);
  }
};

const GoToValuationRequestDetail = ({ notification }) => {
  return (
    <>
      {notification ? (
        <Button
          className="detail-button px-3 py-1"
          as={Link}
          to={`/valuation-request/${notification.notifiableId}`}
          onClick={() => handleReadNotification(notification.id)}
        >
          View request
        </Button>
      ) : null}
    </>
  );
};
