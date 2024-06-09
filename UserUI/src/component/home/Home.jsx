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
                        <img src="https://t4.ftcdn.net/jpg/02/92/56/91/360_F_292569116_Phht4uRj1YIuLFgBhrLu8171npBOcJcr.jpg"
                            alt=""
                        />


                    </Carousel.Item>
                    <Carousel.Item>
                        {/* <ExampleCarouselImage text="Second slide" /> */}
                        <img src="https://i.pinimg.com/originals/33/86/28/338628e1c2115db125fbfff2a36415a8.jpg"
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