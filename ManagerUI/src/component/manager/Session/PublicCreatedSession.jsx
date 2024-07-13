import React, { useEffect, useState } from 'react'
import { getAllCreatedSession, publicCreatedSession } from '../../../services/apiService'
import moment from 'moment'
import { Button } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import { Modal } from 'react-bootstrap'
import AuctionSessionDetail from '../../auction-session/AuctionSessionDetail'

const PublicCreatedSession = () => {

    const [createdSessions, setCreatedSessions] = useState([])
    const [showDetail, setShowDetail] = useState(false);
    const handleCloseDetail = () => setShowDetail(false);

    const handleShowSessionDetail = () => setShowDetail(true);
    const [auctionSessionId, setAuctionSessionId] = useState(null);

    const handleShowDetail = (id) => {
        setAuctionSessionId(id);
        handleShowSessionDetail();
    }

    useEffect(() => {
        const getCreatedSession = async () => {
            try {
                // Your code here
                const response = await getAllCreatedSession();
                setCreatedSessions(response);
            } catch (error) {
                console.log("error", error);
            }
        }
        getCreatedSession()
    }, [])

    const handlePublic = async (sessionId) => {
        try {
            // Your code here
            const response = await publicCreatedSession(sessionId);
            toast.success(`Session ${sessionId} is UPCOMING now`);
        } catch (error) {
            console.log("error", error);
        }


    }

    return (
        <div className="container">
            <div className="text-center">
                <h2>CREATED Auction Session List</h2>
                <div className="">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Session Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th colSpan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {createdSessions && createdSessions.map((session, index) => (
                                <tr key={index}>
                                    <td>{session.id}</td>
                                    <td>{session.name}</td>
                                    <td>{moment(session.startTime).format("MM/DD/YYYY HH:mm:ss")}</td>
                                    <td>{moment(session.endTime).format("MM/DD/YYYY HH:mm:ss")}</td>
                                    <td>{session.status}</td>
                                    <td>
                                        <Button onClick={() => handlePublic(session.id)}>Public</Button>
                                    </td>
                                    <td>
                                        <Button onClick={() => handleShowDetail(session.id)}>Detail</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer />

            <Modal show={showDetail} onHide={handleCloseDetail} centered size="lg" scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Auction Session</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AuctionSessionDetail auctionSessionId={auctionSessionId} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDetail}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default PublicCreatedSession