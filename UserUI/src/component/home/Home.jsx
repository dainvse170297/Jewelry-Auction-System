import React from "react";
import { Carousel } from "react-bootstrap";
import "./home.scss";
import banner1 from "../../assets/banner/banner1.jpg";
import banner2 from "../../assets/banner/banner2.png";
import banner3 from "../../assets/banner/banner3.jpg";

const Home = () => {
  return (
    <>
      <div className="">
        {/* <p>Welcome to the Home Page</p>    */}
        <Carousel className="slide">
          <Carousel.Item>
            {/* <ExampleCarouselImage text="First slide" /> */}
            <img src={banner1} alt="Banner 1" />
          </Carousel.Item>
          <Carousel.Item>
            {/* <ExampleCarouselImage text="Second slide" /> */}
            <img src={banner2} alt="Banner2" />
          </Carousel.Item>
          <Carousel.Item>
            {/* <ExampleCarouselImage text="Second slide" /> */}
            <img src={banner3} alt="Banner 3" />
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
};

export default Home;
