import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { FaBackward } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import '../../home/home.scss'
import Navbar from '../../layout/navbar/Navbar'
import Sidebar from '../../layout/sidebar/Sidebar'
import './style.scss'

const ViewReadyLot = () => {

    const [readyLots, setReadyLots] = useState([])

    useEffect(() => {
        const fetchReadyLots = async () => {
            try {
                await axios.get('http://localhost:8080/lot/ready-lot').then((res) => {
                    setReadyLots(res.data)
                })

            } catch (error) {
                console.log(error)
            }
        }
        fetchReadyLots()
    }, [])

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + '...';
    };

    return (
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="ms-5 me-5">
                    <div className="mt-3">
                        <Link to={"/manager"}><FaBackward /></Link>
                    </div>
                    <h1 className='text-center mt-5'>Ready Lots</h1>
                    <div className="row">
                        {readyLots.map((lot, index) => (
                            <Col md={3} key={index}>
                                <div className="" key={index}>
                                    <div className="card mt-3">
                                        <div className="card-body">
                                            {/* <productImages readyLots={lot} /> */}
                                            <img src={lot.product.productImages[0].imageUrl} alt={lot.product.name + ' photo'} />
                                            <h5 className="card-title"><strong>{lot.product.name}</strong></h5>

                                            <p className="card-subtitle mb-2 text-muted"><em>{truncateText(lot.product.description, 40)}</em></p>
                                            <p className="card-text">Category: <strong>{lot.product.category.name}</strong></p>
                                            <p className="card-text">Estimate Max Price: <strong>{lot.product.estimatePriceMax}</strong></p>
                                            <p className="card-text">Estimate Min Price: <strong>{lot.product.estimatePriceMin}</strong></p>
                                            {/* <p className="card-text">Current Price: <strong>{lot.currentPrice}</strong></p> */}
                                            <button className='link-btn'>
                                                <Link to={`/add-session/${lot.id}`}>Add to Session</Link>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewReadyLot
