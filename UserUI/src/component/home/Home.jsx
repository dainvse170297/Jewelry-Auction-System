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
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-7 offset-md-1 ">
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
                    backgroundImage: `url("https://rapaport.com/wp-content/uploads/2023/02/auction-AMD.jpg")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "390px",
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
                  <h1>Join Selling With Us</h1>
                  <h3>Send valuation request right now!!!</h3>
                  <p>
                    Join FU AUCTION and sell your jewelry and watches to a
                    global audience.
                  </p>
                  <FaArrowRight className="arrow-icon" /> {/* Arrow Icon */}
                </div>
              </div>
              <div className="col-md-12">
                <div
                  className="content-section"
                  style={{
                    backgroundImage: `url("https://static.independent.co.uk/s3fs-public/thumbnails/image/2011/12/14/09/liztaylor.jpg")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "390px",
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
                  <h1>Create Financial Proof For Place Bid</h1>
                  <p>
                    Create financial proof to place bids on FU AUCTION for your
                    jewelry and watches.
                  </p>
                  <FaArrowRight className="arrow-icon" /> {/* Arrow Icon */}
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
