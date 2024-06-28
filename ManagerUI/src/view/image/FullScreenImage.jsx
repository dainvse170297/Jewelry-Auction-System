import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const FullScreenImage = ({ imageUrls }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
  };

  return (
    <>
      <div className="image-preview-container">
        <div className="row d-flex">
          {imageUrls.slice(0, 3).map((url, index) => (
            <div className="col-4">
              <div
                key={index}
                className={`image-preview ${index === 2 ? "blur" : ""}`}
                onClick={() => openModal(index)}
              >
                <img src={url} alt={`Preview ${index}`} />
                {index === 2 && imageUrls.length > 3 && (
                  <div className="overlay">+{imageUrls.length - 2}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal show={showModal} onHide={closeModal} size="lg" centered>
        <Modal.Body>
          <img
            src={imageUrls[currentImageIndex]}
            alt="Full Size"
            style={{ width: "100%" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={prevImage}>
            Previous
          </Button>
          <Button variant="primary" onClick={nextImage}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FullScreenImage;
