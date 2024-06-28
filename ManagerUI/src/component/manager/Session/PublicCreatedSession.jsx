import React, { useEffect, useState } from 'react'
import { getAllCreatedSession, publicCreatedSession } from '../../../services/apiService'
import moment from 'moment'
import { Button } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'

const PublicCreatedSession = () => {

    const [createdSessions, setCreatedSessions] = useState([])

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
                                <th></th>
                                <th>Session Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th>#</th>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default PublicCreatedSession