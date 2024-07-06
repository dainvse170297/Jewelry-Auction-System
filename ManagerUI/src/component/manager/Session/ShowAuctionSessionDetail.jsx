import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getAuctionSessionDetail } from '../../../services/apiService';

const ShowAuctionSessionDetail = ({ sessionId }) => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const [sessionDetail, setSessionDetail] = useState({})

    useEffect(() => {
        const fetchAuctionSessionDetail = async () => {
            try {
                const response = await getAuctionSessionDetail(sessionId)
                setSessionDetail(response)
            } catch (error) {
                console.log("Error get auction session detail by id: ", error)
            }
        }
        fetchAuctionSessionDetail()
    }, [sessionId])

    return (
        <div className=''>
            <h5 className='text-center'>Session Detail</h5>
            <p>Auction Name: <strong>{sessionDetail.name}</strong></p>
            <p>Description: <strong>{sessionDetail.description}</strong></p>
            <p>Start Date: <strong>{formatDate(sessionDetail.startTime)}</strong></p>
            <p>Start Bidding Date: <strong>{formatDate(sessionDetail.startingBid)}</strong></p>
            {/* <p>End Date: <strong>{formatDate(sessionDetail.endTime === null ? sessionDetail.endTime : '')}</strong></p> */}

        </div>
    )
}

export default ShowAuctionSessionDetail