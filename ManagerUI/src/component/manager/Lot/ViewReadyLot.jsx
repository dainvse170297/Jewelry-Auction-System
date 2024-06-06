import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaBackward } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './style.scss'
import { Col } from 'react-bootstrap'

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

    return (
        <div className='container'>
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
                                    {/* <div className="">
                                        <p className="card-text">{lot.product.description}</p>
                                    </div> */}
                                    <p className="card-text">Estimate Max Price: <strong>{lot.product.estimatePriceMax}</strong></p>
                                    <p className="card-text">Estimate Min Price: <strong>{lot.product.estimatePriceMin}</strong></p>
                                    <p className="card-text">Current Price: <strong>{lot.currentPrice}</strong></p>
                                    <button className='button'>
                                        Add to Session
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}

            </div>
        </div>
    )
}

export default ViewReadyLot
