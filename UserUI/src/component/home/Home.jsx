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

const Home = () => {
  return (
    <>
      <div className="">
        <Carousel className="slide">
          <Carousel.Item>
            <img src={banner7} alt="Banner 1" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={banner6} alt="Banner2" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={banner4} alt="Banner 3" />
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
};

export default Home;
