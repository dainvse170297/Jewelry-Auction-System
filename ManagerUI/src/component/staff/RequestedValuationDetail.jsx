import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaBackward } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import '../home/home.scss';
import Navbar from '../layout/navbar/Navbar';
import Sidebar from '../layout/sidebar/Sidebar';

const RequestedValuationDetail = () => {

    const { id } = useParams()
    const [isWaiting, setIsWaiting] = useState(false)

    const [valuationRequest, setValuationRequest] = useState({
        memberId: '',
        estimatePriceMax: '',
        estimatePriceMin: '',
        valuationStatus: '',
        description: ''
    })


    return (
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="ms-5 me-5">
                    <div className="mt-3">
                        <Link to={"/valuation-request"}><FaBackward /></Link>
                    </div>
                    <h3 className='text-center mt-5'>Valuation Request Detail</h3>
                    <div className="card">
                        <div className="card-body">
                            <p>Member ID: <strong>{valuationRequest.memberId}</strong></p>
                            <p>Description: <strong>{valuationRequest.description}</strong></p>
                            <p>Min Price: <strong>{valuationRequest.estimatePriceMin}</strong></p>
                            <p>Max Price: <strong>{valuationRequest.estimatePriceMax}</strong></p>
                        </div>

                        <Button className='btn-success'>
                            <Link to={`/requested-valuation-detail/${request.id}`} style={{ color: 'white', textDecoration: 'none' }}>
                                Confirm information
                            </Link>
                            
                        </Button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default RequestedValuationDetail
