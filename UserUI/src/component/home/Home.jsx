import React from "react";
import { Carousel } from "react-bootstrap";
import "./home.scss";
import banner1 from "../../assets/banner/banner1.jpg";
import banner2 from "../../assets/banner/banner2.png";
import banner3 from "../../assets/banner/banner3.jpg";
import banner4 from "../../assets/banner/banner4.jpg";
import banner5 from "../../assets/banner/banner5.jpg";
import banner6 from "../../assets/banner/banner6.png";
import banner7 from "../../assets/banner/banner7.jpg";
import UpcomingSessionList from "../auction-session/upcoming-session/UpcomingSessionList";
import LiveSessionList from "../auction-session/live-session/LiveSessionList";
import { FaArrowRight } from "react-icons/fa"; // Import the arrow icon from react-icons/fa
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
<<<<<<< HEAD
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <div className="col-sm-10 px-2">
            <div className="row">
              <div className="col-md-7">
                <Carousel>
                  <Carousel.Item>
                    <img
                      src={banner7}
                      style={{ height: "420px", width: "100%" }}
                      alt="Banner 1"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src={banner6}
                      alt="Banner 2"
                      style={{ height: "420px", width: "100%" }}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src={banner4}
                      alt="Banner 3"
                      style={{ height: "420px", width: "100%" }}
                    />
                  </Carousel.Item>
                </Carousel>
              </div>
              <div className="col-md-5">
                <div className="row">
                  <div
                    className="content-section"
                    style={{
                      backgroundImage: `url("https://rapaport.com/wp-content/uploads/2023/02/auction-AMD.jpg")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "200px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#fff",
                      padding: "20px",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div className="row sub-content">
                      <h1 className="sub-title">Join Selling With Us</h1>
                      <Link className="sub-title" to="/create-valuation">
                        Send valuation request right now!!!
                      </Link>
                      <p className="sub-title">
                        Join FU AUCTION and sell your jewelry and watches to a
                        global audience.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="content-section"
                    style={{
                      backgroundImage: `url("https://static.independent.co.uk/s3fs-public/thumbnails/image/2011/12/14/09/liztaylor.jpg")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "200px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#fff",
                      marginTop: "20px",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div className="sub-content">
                      
                    </div>
                    <h1>Create Financial Proof For Place Bid</h1>
                    <p>
                      Create financial proof to place bids on FU AUCTION for
                      your jewelry and watches.
                    </p>
                    <FaArrowRight className="arrow-icon" />
                  </div>
=======
      <div className="container-cus">
        <div className="row">
          <div className="col-md-7 offset-md-1">
            <Carousel className="slide">
              <Carousel.Item>
                <img src={banner7} alt="Banner 1" />
              </Carousel.Item>
              <Carousel.Item>
                <img src={banner6} alt="Banner 2" />
              </Carousel.Item>
              <Carousel.Item>
                <img src={banner4} alt="Banner 3" />
              </Carousel.Item>
            </Carousel>
          </div>

          <div className="col-md-3">
            <div className="row">
              <div className="col-md-12 mb-4">
                <div
                  className="content-section"
                  style={{
                    backgroundImage: `url("https://res.cloudinary.com/dhkmu458i/image/upload/v1720328241/auction-AMD_et4rbd.jpg")`,
                  }}
                >
                  <h2 className="mb-5 text-center">Join Selling With Us</h2>
                  <h4 className="mb-5 text-center">
                    Send valuation request right now!!!
                  </h4>
                  <p className="text-center">
                    Join FU AUCTION and sell your jewelry and watches to a
                    global audience.
                  </p>
                  <a href="/create-valuation" className="arrow-link">
                    <FaArrowRight className="arrow-icon" /> {/* Arrow Icon */}
                  </a>
                </div>
              </div>
              <div className="col-md-12">
                <div
                  className="content-section"
                  style={{
                    backgroundImage: `url("https://res.cloudinary.com/dhkmu458i/image/upload/v1720328480/01_46_u9uvx2.jpg")`,
                  }}
                >
                  <h2 className=" mb-5 text-center">
                    Create Financial Proof For Place Bid
                  </h2>
                  <h4 className="mb-5 text-center">
                    Send financial proof for us!!!
                  </h4>
                  <p className="text-center mt-5">
                    Create financial proof to place bids on FU AUCTION for your
                    jewelry
                  </p>
                  <a href="/create-financial-proof" className="arrow-link">
                    <FaArrowRight className="arrow-icon" /> {/* Arrow Icon */}
                  </a>
>>>>>>> hai-linh-fe
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-12">
            <LiveSessionList />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12">
            <UpcomingSessionList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
