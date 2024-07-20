import { LinearProgress, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { getMembersInLot } from '../../services/apiService';

const MembersInLot = ({ lotId }) => {

    const [attendees, setAttendees] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const getAttendees = async () => {
            try {
                const response = await getMembersInLot(lotId);
                setAttendees(response);
                setIsLoading(false);
            } catch (error) {
                console.log("error", error);
            }
        }
        getAttendees();
    }, [])

    return (
        <>
            <TableContainer component={Table}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading && <LinearProgress />}
                        {attendees.map((attendee, index) => (
                            <TableRow key={index}>
                                <TableCell>{attendee.member?.fullname}</TableCell>
                                <TableCell>{attendee.member?.email}</TableCell>
                                <TableCell>{attendee.member?.phone}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default MembersInLot