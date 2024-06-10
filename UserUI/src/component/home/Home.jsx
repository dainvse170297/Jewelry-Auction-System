import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateValuation from '../valuation_request/create/CreateValuation';
import './home.scss';
import { Carousel } from 'react-bootstrap';

const Home = () => {
    return (
        <>
            <div className="">
                <Routes>
                    <Route path='/create-valuation' element={<CreateValuation />} />
                </Routes>

                {/* <p>Welcome to the Home Page</p>    */}
                <Carousel className='slide'>
                    <Carousel.Item>
                        {/* <ExampleCarouselImage text="First slide" /> */}
                        <img src="https://t4.ftcdn.net/jpg/02/20/10/25/240_F_220102512_DwScZjA9hJaBOH2BS3vraUehWijM5an8.jpg"
                            alt=""
                        />


                    </Carousel.Item>
                    <Carousel.Item>
                        {/* <ExampleCarouselImage text="Second slide" /> */}
                        <img src="https://salijewelry.com/wp-content/uploads/2022/07/BANNER-2.png"
                            alt=""
                        />


                    </Carousel.Item>
                    <Carousel.Item>
                        {/* <ExampleCarouselImage text="Second slide" /> */}
                        <img src="https://zeevector.com/wp-content/uploads/Jewellery-Banner-Design-HD.png"
                            alt=""
                        />

                    </Carousel.Item>
                </Carousel>
            </div>
        </>
    );
}

export default Home;