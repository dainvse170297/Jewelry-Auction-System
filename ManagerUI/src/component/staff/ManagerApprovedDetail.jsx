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


const ManagerApprovedDetail = () => {

    const { id } = useParams()
    const [isWaiting, setIsWaiting] = useState(false)

    // my name is Linh
    const [valuationRequest, setValuationRequest] = useState({})

    const [product, setProduct] = useState({
    
        productImages: [],
    })

    



    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const requestData = await axios.get(`http://localhost:8080/valuation/view-manager-approved-detail/${id}`)
                setValuationRequest(requestData.data)
            } catch (error) {
                console.log("Error ai fetchRequest: ", error)
            }
        }
        fetchRequest()
    }, [id])

    const navigate = useNavigate()

    const handleSend = async (e) => {
        try{
            setIsWaiting(true)
        
            const param = new URLSearchParams()
            param.append('id', id)
            //Default staff
            param.append('staffId', '1')
            const response = await axios.post(`http://localhost:8080/valuation/send-final-valuation-to-member`, param)
            if(response.status === 200){
                setIsWaiting(false)
                toast.success("Send to member successfully")
                navigate('/manager-approved-list')
            }
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    return (
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="ms-5 me-5">
                    <div className="mt-3">
                        <Link to={"/manager-approved-list"}><FaBackward /></Link>
                    </div>
                    <h3 className='text-center mt-5' style={{ color: 'red' }}  >Final Valuation Request Detail</h3>
                    <div className="card">
                         <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <p>Member ID: <strong>{valuationRequest.memberId}</strong></p>
                                    <p>Product Name: <strong>{valuationRequest.productName}</strong></p>
                                    <p>Product Description: <strong>{valuationRequest.productDescription}</strong></p>
                                    <p>Category: <strong>{valuationRequest.category}</strong></p>
                                    <p>Estimate Min Price: <strong>{valuationRequest.estimatePriceMinProduct}</strong></p>
                                    <p>Estimate Max Price: <strong>{valuationRequest.estimatePriceMaxProduct}</strong></p>
                                </div>
                                <div className="col-md-6">
                                    <p>Product Images:</p>
                                    <div className="row">
                                        {valuationRequest.productImages && valuationRequest.productImages.map((image, index) => (
                                            <div className="col-sm-6" key={index}>
                                                <img src={image.imageUrl} alt="product"  style={{ width: '100%' }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                            {!isWaiting ? (
                                <Button variant="success" onClick={handleSend}>Send to member</Button>
                            ) : (
                                <>
                                    <CircularProgress />
                                </>
                            )} 
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManagerApprovedDetail
