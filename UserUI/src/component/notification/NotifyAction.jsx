import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./notify.scss";
import { Link } from "react-router-dom";

export { GoToValuationRequestDetail, ShowResponseList };

import { getReadNotify } from "../../services/apiService";
import ValuationResponseList from "../profile/valuation-response/ValuationResponseList";

const handleReadNotification = async (notificationId) => {
  //console.log('notificationId ', notificationId);
  try {
    const response = await getReadNotify(notificationId);
    if (response) {
      //   window.location.reload();
    }
  } catch (error) {
    console.log("error", error);
  }
};

const GoToValuationRequestDetail = ({ notification }) => {
  return (
    <div className="action">
      {notification ? (
        <Button
          className="detail-button-1 px-3 py-1"
          as={Link}
          to={`/valuation-request/${notification.notifiableId}`}
          onClick={() => handleReadNotification(notification.id)}
        >
          View request
        </Button>
      ) : null}
    </div>
  );
};

const ShowResponseList = ({ notification }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowResponse = (notification) => {
    handleReadNotification(notification.id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="action">
      {notification && notification.notifiableId ? (
        <>
          <Button
            className="detail-button px-2 py-1 mx-2"
            onClick={() => handleShowResponse(notification)}
          >
            View response
          </Button>

          <Modal show={showModal} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Valuation Response</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ValuationResponseList id={notification.notifiableId} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="standard" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : null}
    </div>
  );
};
