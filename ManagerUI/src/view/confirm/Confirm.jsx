import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const Confirm = ({
  message,
  mainLabel,
  className,
  labelYes,
  labelNo,
  onConfirm,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleYesClick = () => {
    onConfirm(true);
    setShowConfirm(false);
  };

  const handleNoClick = () => {
    onConfirm(false);
    setShowConfirm(false);
  };

  const hadleShow = () => {
    setShowConfirm(true);
  };

  return (
    <>
      <Button variant={className} onClick={hadleShow}>
        {mainLabel}
      </Button>
      <Modal show={showConfirm}>
        <Modal.Header>
          <Modal.Title>Confirm action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleYesClick}>
            {labelYes}
          </Button>
          <Button variant="success" onClick={handleNoClick}>
            {labelNo}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Confirm;
