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

const Home = () => {
  return (
    <>
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
