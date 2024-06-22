import React, { useState } from "react";

const FullScreenImage = ({ imageUrls }) => {
  // Changed to accept an array of URLs
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // State to track current image index

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    setIsFullScreen(false);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length); // Move to next image, cycle back to start
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    ); // Move to previous image, cycle back to end
  };

  return (
    <div
      onClick={toggleFullScreen}
      style={
        isFullScreen
          ? {
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 1000,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }
          : {}
      }
    >
      {isFullScreen && (
        <>
          <img
            src={imageUrls[currentIndex]}
            alt="Full screen"
            style={{ maxWidth: "90%", maxHeight: "90%" }}
          />
          <button
            onClick={handlePrev}
            style={{
              position: "absolute",
              left: 20,
              fontSize: "1.5rem",
              color: "white",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            {"<"}
          </button>
          <button
            onClick={handleNext}
            style={{
              position: "absolute",
              right: 20,
              fontSize: "1.5rem",
              color: "white",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            {">"}
          </button>
          <button
            onClick={handleCloseClick}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              fontSize: "1.5rem",
              color: "white",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};

export default FullScreenImage;
