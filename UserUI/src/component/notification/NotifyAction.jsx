import React from "react";
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

const ShowResponseList = ({ notification }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowResponse = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {notification && notification.notifiableId ? (
        <>
          <Button
            className="detail-button px-3 py-1"
            as={Link}
            to={`/valuation-response/${notification.notifiableId}`}
            onClick={() => handleReadNotification(notification.id)}
          >
            View response
          </Button>
          <Button
            className="detail-button px-3 py-1"
            onClick={handleShowResponse}
          ></Button>
          <Modal show={showModal} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Valuation Response</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedRequestId && (
                <ValuationResponseList id={notification.id} />
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="standard" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : null}
    </>
  );
};
