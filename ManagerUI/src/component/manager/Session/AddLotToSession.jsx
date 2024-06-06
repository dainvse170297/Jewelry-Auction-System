import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Carousel } from 'react-bootstrap'
import { FaBackward } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import '../../home/home.scss'
import Navbar from '../../layout/navbar/Navbar'
import Sidebar from '../../layout/sidebar/Sidebar'

const AddLotToSession = () => {

    const [lot, setLot] = useState([])
    const { id } = useParams()

    const [createdSessions, setCreatedSessions] = useState([])

    useEffect(() => {
        const getLotById = async () => {
            try {
                await axios.get(`http://localhost:8080/lot/ready-lot/${id}`).then((res) => {
                    setLot(res.data)
                })
            } catch (error) {
                console.log("Error get lot detail by id: ", error)
            }
        }
        getLotById()
    }, [id])

    useEffect(() => {
        const getAllCreatedSession = async () => {
            try {
                await axios.get('http://localhost:8080/auction/all-created-session').then((res) => {
                    setCreatedSessions(res.data)
                })
            } catch (error) {
                console.log("Error get all created session: ", error)
            }
        }
        getAllCreatedSession()
    }, [])

    console.log(createdSessions)

    return (
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="ms-5 me-5">
                    <div className="mt-3">
                        <Link to={"/ready-lots"}><FaBackward /></Link>
                    </div>
                    <h1 className='text-center mt-3 mb-5'>Add Lot to Session</h1>
                    <form action="">
                        <div className="container">
                            <div className="ms-5">
                                <div className="row">

                                    <div className="col-lg-3">
                                        <h3 className='text-center'>Lot Information</h3>
                                        <Carousel>
                                            {lot.product?.productImages?.map((image, index) => (

                                                <Carousel.Item key={index}>
                                                    <img
                                                        className="d-block w-100"
                                                        src={image.imageUrl}
                                                        alt={lot.product.name + ' photo'}
                                                        style={{ height: '300px', width: '200px' }}
                                                    />
                                                </Carousel.Item>

                                            ))}
                                        </Carousel>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title className='text-center'>{lot.product?.name}</Card.Title>
                                                <Card.Text>
                                                    <p>Estimate Max Price: <strong>{lot.product?.estimatePriceMax}</strong></p>
                                                    <p>Estimate Min Price: <strong>{lot.product?.estimatePriceMin}</strong></p>
                                                    <p>Current Price: <strong>{lot.currentPrice}</strong></p>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                    <div className="col-lg-8">
                                        <h3 className='text-center'>Sessions Information</h3>
                                        <div className="">
                                            <select name="" id="" className='form-select'>
                                                <option value="" className='text-secondary'>--Select Session--</option>
                                                {createdSessions.map((session, index) => (
                                                    <option value={session.id} key={index}>
                                                        <div className="">{session.name}</div>
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default AddLotToSession
