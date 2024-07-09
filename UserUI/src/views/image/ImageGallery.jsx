import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";

const ImageGallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (index) => {
    setSelectedIndex(index);
    setShow(true);
  };

  const handleSelect = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
  };

  return (
    <>
      <div className="row">
        <img
          className="img-fluid mb-2"
          src={images[selectedIndex]}
          alt={`image-${selectedIndex}`}
        />
      </div>

      <div className="row">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`thumbnail-${index}`}
            onClick={() => setSelectedIndex(index)}
            className={
              index === selectedIndex
                ? "selected img-fluid col-3 d-flex justify-content-center border rounded-2 mx-2 px-0"
                : "img-fluid col-3 d-flex justify-content-center border rounded-2 mx-2 px-0"
            }
          />
        ))}
      </div>
    </>
  );
  //   <div className="image-gallery">
  //     <div className="row" onClick={() => handleShow(selectedIndex)}>
  //       <img
  //         className="img-fluid"
  //         src={images[selectedIndex]}
  //         alt={`image-${selectedIndex}`}
  //       />
  //     </div>
  //     <div className="thumbnails row">
  //       {images.map((src, index) => (
  //         <img
  //           key={index}
  //           src={src}
  //           alt={`thumbnail-${index}`}
  //           onClick={() => setSelectedIndex(index)}
  //           className={
  //             index === selectedIndex
  //               ? "selected img-fluid col-4"
  //               : "img-fluid col-4"
  //           }
  //         />
  //       ))}
  //     </div>
  //     <Button
  //       variant="secondary"
  //       onClick={() =>
  //         setSelectedIndex((selectedIndex - 1 + images.length) % images.length)
  //       }
  //     >
  //       Previous
  //     </Button>
  //     <Button
  //       variant="secondary"
  //       onClick={() => setSelectedIndex((selectedIndex + 1) % images.length)}
  //     >
  //       Next
  //     </Button>

  //     <Modal show={show} onHide={handleClose}>
  //       <Modal.Header closeButton>
  //         <Modal.Title>Image Viewer</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <Carousel
  //           activeIndex={selectedIndex}
  //           onSelect={handleSelect}
  //           interval={null}
  //         >
  //           {images.map((src, index) => (
  //             <Carousel.Item key={index}>
  //               <img
  //                 src={src}
  //                 alt={`carousel-image-${index}`}
  //                 className="d-block w-100"
  //               />
  //             </Carousel.Item>
  //           ))}
  //         </Carousel>
  //       </Modal.Body>
  //     </Modal>
  //   </div>
  // );
};

export default ImageGallery;
