import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Carousel } from 'react-bootstrap'
import { FaBackward } from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import '../../home/home.scss'
import Navbar from '../../layout/navbar/Navbar'
import Sidebar from '../../layout/sidebar/Sidebar'
import ShowAuctionSessionDetail from './ShowAuctionSessionDetail'
import './style.scss'
import 'react-toastify/dist/ReactToastify.css';

const AddLotToSession = () => {

    const [lot, setLot] = useState([])
    const { id } = useParams()

    const [data, setData] = useState({
        lotId: id,
        sessionId: ''
    })
    const [showAuctionSessionDetail, setShowAuctionSessionDetail] = useState(false)
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


    const handleInputChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        if (e.target.value !== '') {
            setShowAuctionSessionDetail(true)
        }
        if (e.target.value === '') {
            setShowAuctionSessionDetail(false)
        }
        setData({ ...data, [name]: value })
    }

    const navigate = useNavigate()

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (data.sessionId === '') {
            toast.warning("Please select a session")
        } else {
            const formData = new FormData()
            formData.append("lotId", data.lotId)
            formData.append("sessionId", data.sessionId)
            axios.post('http://localhost:8080/auction/add-lot-to-session', formData)
                .then((response) => {
                    console.log("Lot added to session")
                    toast.success("Lot added to session successfully!")
                    setTimeout(() => {
                        navigate("/ready-lots")
                    }, 4000)
                })
                .catch((error) => {
                    console.log("Error adding lot to session: ", error)
                    toast.error("Error adding lot to session")
                })
            // console.log(formData)
        }

    }

    return (
        <>
        
        <div className='home'>
            
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <ToastContainer />
                <div className="ms-5 me-5">
                    <div className="mt-3">
                        <Link to={"/ready-lots"}><FaBackward /></Link>
                    </div>
                    <h1 className='text-center mt-3 mb-5'>Add Lot to Session</h1>
                    <form action="" onSubmit={handleFormSubmit}>
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
                                                <Card.Title className='text-center'><strong>{lot.product?.name}</strong></Card.Title>
                                                <Card.Text>
                                                    <p><em>{lot.product?.description}</em></p>
                                                    <p>Estimate Max Price: <strong>{lot.product?.estimatePriceMax}</strong></p>
                                                    <p>Estimate Min Price: <strong>{lot.product?.estimatePriceMin}</strong></p>
                                                    {/* <p>Current Price: <strong>{lot.currentPrice}</strong></p> */}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>

                                    <div className="col-lg-6">
                                        <label htmlFor="session">Select Auction Session <span style={{ color: 'red' }}>*</span></label>
                                        <div className="">
                                            <select name="sessionId" id="session" className='form-select'
                                                value={data.sessionId}
                                                onChange={handleInputChange}>
                                                <option value="" className='text-secondary'>--Select Session--</option>
                                                {createdSessions.map((session, index) => (
                                                    <option value={session.id} key={index}>
                                                        {session.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mt-5 d-flex justify-content-center">
                                            {showAuctionSessionDetail && (
                                                <ShowAuctionSessionDetail sessionId={data.sessionId} />
                                            )}
                                        </div>
                                        {showAuctionSessionDetail && (
                                            <div className='btn-area'>
                                                <button className='submit-btn' type='submit'>
                                                    Submit
                                                </button>

                                                <button className='cancel-btn'>
                                                    <Link to='/ready-lots'>Cancel</Link>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-lg-3"></div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default AddLotToSession
