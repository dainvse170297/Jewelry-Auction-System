import React, { useEffect, useState } from 'react'
import './upcoming-session-lot.scss'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpcomingSessionLot = () => {

    const [lot, setLot] = useState({})

    const { lotId } = useParams()

    const currentUser = JSON.parse(localStorage.getItem('account'))

    useEffect(() => {
        const getProductFromLot = async () => {
            try {
                const data = await axios.get(`http://localhost:8080/lot/lot-detail/${lotId}`)
                setLot(data.data)
            } catch (error) {
                console.log(error);
            }
        }

        getProductFromLot()

    }, [lotId])

    // console.log(lot.id + "lot id - " + currentUser.memberId + "member id");

    return (
        <div className='container'>
            <div className="">
                <a href="#" className='a'><ArrowBackIcon /> BACK TO AUCTION</a>
            </div>
            <hr />
            <div className="row">
                <div className="col-md-5">
                    <Carousel>
                        {lot.productImages && lot.productImages.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100"
                                    src={image.imageUrl}
                                    alt={image.defaultImage} />
                                <Carousel.Caption>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ), [])}
                    </Carousel>
                </div>
                <div className="col-md-7">
                    <h4>{lot.productName}</h4>
                    <p className='secondary'>Price: ${lot.currentPrice}</p>
                    <h5>{lot.status}</h5>
                    <div className="mt-5">
                        <button className='register-btn'>Register</button>
                    </div>
                    <div className="mt-3">
                        <button className='register-to-bid-btn'>Register To Bid</button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default UpcomingSessionLot
