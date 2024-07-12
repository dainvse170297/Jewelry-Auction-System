import React, { useEffect, useState } from 'react'
import { getAllStaffAccount, getAuctionSessionById, postUpdateSession } from '../../services/apiService'
import { Button, Form } from "react-bootstrap";
import moment from "moment/moment";
import { ToastContainer, toast } from "react-toastify";
import FullScreenImage from '../../view/image/FullScreenImage';
import { CircularProgress } from '@mui/material';

const EditAuctionSession = ({ auctionSessionId }) => {

    const [editingSession, setEditingSession] = useState({
        name: '',
        description: '',
        startTime: '',
        endTime: '',
        startingBid: '',
        staffId: '',
    })
    const [staffs, setStaffs] = useState([]);
    const [imagePreview, setImagePreview] = useState("");
    const [isWaiting, setIsWaiting] = useState(false);

    useEffect(() => {
        const getEditAuctionSession = async () => {
            try {
                const response = await getAuctionSessionById(auctionSessionId)
                setEditingSession(response)
            } catch (error) {
                console.log("error", error)
            }
        }
        getEditAuctionSession()
    }, [])

    useEffect(() => {
        const getStaffAccounts = async () => {
            try {
                const staffData = await getAllStaffAccount();
                setStaffs(staffData);
            } catch (error) {
                console.log("Error fetching staff accounts", error);
            }
        };
        getStaffAccounts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingSession({ ...editingSession, [name]: value });
    };

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setEditingSession({ ...editingSession, image: imageFile });
        setImagePreview(URL.createObjectURL(imageFile));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (
            editingSession.name.trim() === "" ||
            editingSession.description.trim() === "" ||
            editingSession.staffId === null ||
            editingSession.startTime.trim() === "" ||
            editingSession.startingBid.trim() === ""
        ) {
            toast.warning("Need to fill all fields");
        } else if (moment(editingSession.startingBid).isAfter(moment(editingSession.startTime))) {
            toast.error("Starting Bid Date must be before Start Date");
        } else if (moment(editingSession.startTime).isAfter(moment(editingSession.endTime))) {
            toast.error("Start Date must be before End Date");
        } else {
            try {
                setIsWaiting(true);
                const response = await postUpdateSession(auctionSessionId, editingSession);
                if (response) {
                    toast.success("Auction Session updated successfully!");
                    setIsWaiting(false);
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                } else {
                    toast.error("Error edit auction session");
                    setIsWaiting(false);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    };

    return (
        <>
            <h2 className="text-center mt-2">EDIT</h2>
            <div className="mt-3">

                <form action="" onSubmit={handleFormSubmit}>
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-6">
                            {/* Input session name */}

                            <Form.Label htmlFor="name">
                                Session Name <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                id="name"
                                name="name"
                                value={editingSession.name}
                                onChange={handleInputChange}
                            />



                            {/* Input session description */}

                            <Form.Label htmlFor="description">
                                Session Description <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                as="textarea"
                                id="description"
                                name="description"
                                value={editingSession.description}
                                onChange={handleInputChange}
                            />

                            {/* Input session start date */}

                            <Form.Label htmlFor="startTime">
                                Start Date <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                                type="datetime-local"
                                id="startTime"
                                name="startTime"
                                value={editingSession.startTime}
                                min={moment().format("MM Do, YYYY")}
                                onChange={handleInputChange}
                            />

                            <Form.Label htmlFor="endTime">
                                End Date <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                                type="datetime-local"
                                id="endTime"
                                name="endTime"
                                value={editingSession.endTime}
                                min={moment().format("MM Do, YYYY")}
                                onChange={handleInputChange}
                            />

                            {/* Select staff to manage session */}

                            <Form.Label>
                                Choose Staff <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Select
                                size=""
                                aria-label="Default select example"
                                name="staffId"
                                value={editingSession.staffId}
                                onChange={handleInputChange}
                            >
                                {staffs.map((staff, index) => (
                                    <option
                                        key={index}
                                        value={staff.staffId}
                                        className=""
                                        {...editingSession.staffId === staff.staffId ? 'selected' : ''}
                                    >
                                        {staff.fullname}
                                    </option>
                                ))}
                            </Form.Select>

                            {/* Input session starting bid date */}

                            <Form.Label>
                                Starting Bid Date <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                                type="datetime-local"
                                id="startingBid"
                                name="startingBid"
                                value={editingSession.startingBid}
                                min={moment().format("MM Do, YYYY")}
                                onChange={handleInputChange}
                            />
                            <br />
                            {!isWaiting ? (
                                <Button variant="primary" type="submit" size="lg" className="mt-3">
                                    Save
                                </Button>
                            ) : (
                                <CircularProgress />
                            )}
                        </div>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </>
    )
}

export default EditAuctionSession