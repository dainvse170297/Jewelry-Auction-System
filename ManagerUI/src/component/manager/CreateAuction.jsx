import axios from 'axios'
import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { FaBackward } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import '../home/home.scss'
import Navbar from '../layout/navbar/Navbar'
import Sidebar from '../layout/sidebar/Sidebar'
import { CircularProgress } from '@mui/material'

const CreateAuction = () => {

    const [staffs, setStaffs] = useState([])

    const [auctionSession, setAuctionSession] = useState({
        name: '',
        description: '',
        startTime: '',
        endTime: '',
        startingBid: '',
        staffId: '',
        image: ''
    })

    const [isWaiting, setIsWaiting] = useState(false)
    const [imagePreview, setImagePreview] = useState("")

    useEffect(() => {
        const getStaffAccounts = async () => {
            try {
                const staffAccountsData = await axios.get("http://localhost:8080/staff/accounts")
                setStaffs(staffAccountsData.data)
            } catch (error) {
                console.log("Error fetching staff accounts", error)
            }
        }
        getStaffAccounts()
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setAuctionSession({ ...auctionSession, [name]: value })
    }

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0]
        setAuctionSession({ ...auctionSession, image: imageFile })
        setImagePreview(URL.createObjectURL(imageFile))
    }


    const navigate = useNavigate()

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        if (auctionSession.name.trim() === '' || auctionSession.description.trim() === '' || auctionSession.staffId.trim() === '' || auctionSession.startTime.trim() === '' || auctionSession.startingBid.trim() === '') {
            toast.warning("Need to fill all fields")
        }
        if (moment(auctionSession.startingBid).isAfter(moment(auctionSession.startTime))) {
            toast.error("Starting Bid Date must be before Start Date")
        }
        if (moment(auctionSession.startTime).isAfter(moment(auctionSession.endTime))) {
            toast.error("Start Date must be before End Date")
        } else {
            try {
                const formData = new FormData()
                formData.append("staffId", auctionSession.staffId)
                formData.append("name", auctionSession.name)
                formData.append("description", auctionSession.description)
                formData.append("startTime", auctionSession.startTime)
                formData.append("endTime", auctionSession.endTime)
                formData.append("startingBid", auctionSession.startingBid)
                formData.append("image", auctionSession.image)
                setIsWaiting(true)
                const createSession = await axios.post("http://localhost:8080/auction/create-session", formData)
                    .then((response) => {
                        console.log("Auction session created")
                        toast.success("Auction Session created successfully!")
                        setIsWaiting(false)
                        setTimeout(() => {
                            navigate("/manager")
                        }, 2000)
                    }).catch(error => {
                        console.log("Error create auction session")
                        toast.error("Error occurred when create Session, please try again!")
                        setIsWaiting(false)
                    })
            } catch (error) {
                console.log(error.message)
            }
        }

    }

    return (
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="ms-5 me-5">
                    <div className="mt-3">
                        <Link to={"/manager"}><FaBackward /></Link>
                    </div>
                    <h1 className='text-center mt-3'>Create Auction Session</h1>
                    <div className="mt-3">
                        <form action="" onSubmit={handleFormSubmit}>
                            <div className="row">
                                <div className="col-lg-4"></div>
                                <div className="col-lg-4">

                                    {/* Input session name */}

                                    <Form.Label htmlFor='name'>Session Name <span style={{ color: 'red' }}>*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        id='name'
                                        name='name'
                                        value={auctionSession.name}
                                        onChange={handleInputChange}
                                    />


                                    {/* Input session description */}

                                    <Form.Label htmlFor='description'>Session Description <span style={{ color: 'red' }}>*</span></Form.Label>
                                    <Form.Control
                                        type="text" as="textarea"
                                        id='description'
                                        name='description'
                                        value={auctionSession.description}
                                        onChange={handleInputChange}
                                    />


                                    {/* Input session start date */}

                                    <Form.Label htmlFor='startTime'>Start Date <span style={{ color: 'red' }}>*</span></Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        id='startTime'
                                        name='startTime'
                                        value={auctionSession.startTime}
                                        min={moment().format("MM Do, YYYY")}
                                        onChange={handleInputChange}
                                    />

                                    <Form.Label htmlFor='endTime'>End Date <span style={{ color: 'red' }}>*</span></Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        id='endTime'
                                        name='endTime'
                                        value={auctionSession.endTime}
                                        min={moment().format("MM Do, YYYY")}
                                        onChange={handleInputChange}
                                    />


                                    {/* Select staff to manage session */}

                                    <Form.Label>Choose Staff <span style={{ color: 'red' }}>*</span></Form.Label>
                                    <Form.Select size=''
                                        aria-label="Default select example"
                                        name='staffId'
                                        value={auctionSession.staffId}
                                        onChange={handleInputChange}
                                    >
                                        <option value="" className='text-secondary'>
                                            -- Select Staff --
                                        </option>
                                        {staffs.map((staff) => (
                                            <option key={staff.staffId} value={staff.staffId} className=''>
                                                {staff.username}
                                            </option>
                                        ))}
                                    </Form.Select>

                                    {/* Input session starting bid date */}

                                    <Form.Label>Starting Bid Date <span style={{ color: 'red' }}>*</span></Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        id='startingBid'
                                        name='startingBid'
                                        value={auctionSession.startingBid}
                                        min={moment().format("MM Do, YYYY")}
                                        onChange={handleInputChange}
                                    />

                                    <Form.Label>Banner Photo</Form.Label>
                                    <Form.Control
                                        type="file"
                                        id='image'
                                        name='image'
                                        onChange={handleImageChange}
                                    />

                                    {imagePreview && (
                                        <img src={imagePreview} alt="Preview Auction Banner"
                                            style={{ widows: "400px", maxHeight: "400px" }} />
                                    )}

                                    {!isWaiting ? (
                                        <Button variant='success' type='submit' className='mt-3'>
                                            Submit
                                        </Button>
                                    ) : (
                                        <CircularProgress />
                                    )}

                                </div>
                                <div className="col-lg-4"></div>
                            </div>
                        </form>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateAuction
