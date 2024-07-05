import React, { useState } from "react";
import { Button, Modal, Image, Row, Col } from "react-bootstrap";
import PhotoUploadIcon from "@mui/icons-material/Backup";

function PhotoReviewModal({ onOk }) {
  const [show, setShow] = useState(false);
  const [images, setImages] = useState([]);

  const [preview, setPreview] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleImageUpload = (event) => {
    const imageFiles = Array.from(event.target.files);
    const imageUrls = imageFiles.map((file) => URL.createObjectURL(file));
    setImages(imageFiles);
    setPreview(imageUrls);
    handleShow();
  };

  const handleOk = () => {
    // Handle the image upload here
    onOk(images);
    handleClose();
  };

  const handleCancel = () => {
    setImages([]);
    handleClose();
  };

  return (
    <>
      <input
        type="file"
        multiple
        accept="image/jpeg, image/png, image/jpg, image/pdg"
        onChange={handleImageUpload}
      />

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Review Photos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {preview.map((image, index) => (
              <Col xs={6} md={3} key={index}>
                <Image src={image} fluid key={index} />
              </Col>
            ))}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleOk}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PhotoReviewModal;
