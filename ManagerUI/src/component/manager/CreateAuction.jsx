import axios from 'axios'
import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { FaBackward } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const CreateAuction = () => {

    const [staffs, setStaffs] = useState([])

    const [auctionSession, setAuctionSession] = useState({
        name: '',
        description: '',
        startTime: '',
        startingBid: '',
        staffId: ''
    })

    const [isWaiting, setIsWaiting] = useState(false)

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


    const navigate = useNavigate()

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        if (auctionSession.name.trim() === '' || auctionSession.description.trim() === '' || auctionSession.staffId.trim() === '' || auctionSession.startTime.trim() === '' || auctionSession.startingBid.trim() === '') {
            toast.warning("Need to fill all fields")
        }
        if (moment(auctionSession.startingBid).isAfter(moment(auctionSession.startTime))) {
            toast.error("Starting Bid Date must be before Start Date")
        } else {
            try {
                const formData = new FormData()
                formData.append("staffId", auctionSession.staffId)
                formData.append("name", auctionSession.name)
                formData.append("description", auctionSession.description)
                formData.append("startTime", auctionSession.startTime)
                formData.append("startingBid", auctionSession.startingBid)
                setIsWaiting(true)
                const createSession = await axios.post("http://localhost:8080/auction/create-session", formData)
                    .then((response) => {
                        console.log("Auction session created")
                        toast.success("Auction Session created successfully!")
                        setIsWaiting(false)
                        setTimeout(() => {
                            navigate("/manager")
                        }, 6000)
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
        <div className='container'>
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
                                type="date"
                                id='startTime'
                                name='startTime'
                                value={auctionSession.startTime}
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
                                type="date"
                                id='startingBid'
                                name='startingBid'
                                value={auctionSession.startingBid}
                                min={moment().format("MM Do, YYYY")}
                                onChange={handleInputChange}
                            />

                            <Button variant='success' type='submit' className='mt-3'>
                                Submit
                            </Button>
                        </div>
                        <div className="col-lg-4"></div>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default CreateAuction
