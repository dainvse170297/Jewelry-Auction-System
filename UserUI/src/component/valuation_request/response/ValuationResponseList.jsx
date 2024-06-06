import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaBackward } from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';

const ValuationResponseList = () => {

    const { id } = useParams()
    const [isWaiting, setIsWaiting] = useState(false)
    const [ValuationResponses, setValuationResponses] = useState([])

    
    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const responsesData = await axios.get(`http://localhost:8080/response/view-valuation-response/${id}`)
                setValuationResponses(responsesData.data)
            } catch (error) {
                console.log("Error ai fetchRequest: ", error)
            }
        }
        fetchRequest()
    }, [id])

    return (
        <>
            <div className="">
                This is Valuation Response List id = {id}
            </div>
        </>

    )

}

export default ValuationResponseList