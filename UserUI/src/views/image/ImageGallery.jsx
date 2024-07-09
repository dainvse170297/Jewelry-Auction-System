import React, { useEffect, useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./image.scss";

const ImageGallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [firstThreeImages, setFirstThreeImages] = useState(images.slice(0, 4));

  const handleClose = () => setShow(false);
  const handleShow = (index) => {
    setSelectedIndex(index);
    setShow(true);
  };

  const handleSelect = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
  };

  useEffect(() => {
    if ((selectedIndex + 1) % 4 === 1) {
      console.log(">>> update images");
      setFirstThreeImages(images.slice(selectedIndex, selectedIndex + 4));
    }
  }, [selectedIndex, images]);

  return (
    <>
      <div className="row main-image my-2">
        <button
          className="previous-button"
          onClick={() =>
            setSelectedIndex(
              (selectedIndex - 1 + images.length) % images.length
            )
          }
        >
          <KeyboardArrowLeftIcon className="icon" />
        </button>

        <img
          onClick={() => handleShow(selectedIndex)}
          className="img-fluid"
          src={images[selectedIndex]}
          alt={`image-${selectedIndex}`}
        />

        <button
          className="next-button"
          onClick={() => setSelectedIndex((selectedIndex + 1) % images.length)}
        >
          <KeyboardArrowRightIcon className="icon" />
        </button>
      </div>
      <div className="row small-images">
        {firstThreeImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`thumbnail-${index}`}
            onClick={() => setSelectedIndex(index)}
            className={index === selectedIndex ? "selected col-3" : "col-3"}
          />
        ))}
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Body>
          <Carousel
            activeIndex={selectedIndex}
            onSelect={handleSelect}
            interval={null}
          >
            {images.map((src, index) => (
              <Carousel.Item key={index}>
                <img
                  src={src}
                  alt={`carousel-image-${index}`}
                  className="d-block w-100"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ImageGallery;
