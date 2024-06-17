import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBackward } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { Button, Carousel } from 'react-bootstrap'
import Paginator from '../common/Paginator'
import '../home/home.scss'
import Sidebar from '../layout/sidebar/Sidebar'
import Navbar from '../layout/navbar/Navbar'
import { toast } from 'react-toastify'

export default function FinalValuationRequestDetail() {

    const { id } = useParams()

    const [ProductInfo, setProductInfo] = useState({})
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        // setIsLoading(true)
        const getInfoDetails = async () => {

            try {
                await axios.get(`http://localhost:8080/valuation/view-final-request-details/${id}`).then((result) => {
                    setProductInfo(result.data)
                })

            } catch (error) {
                console.log("Error:", error.message)
                setErrorMsg("Error fetching data from server")
            }
        }
        getInfoDetails()

    }, [id])

    const navigate = useNavigate()

    const handleApprove = async () => {
        try {
            const id = ProductInfo.valuationRequestId

            const response = await axios.post(`http://localhost:8080/valuation/approve-final-valuation/${id}`);

            if (response.status === 200) {
                // console.log("Success")
                toast.success("Approved successfully")
                navigate('/final-valuation-request-list')
            } else {
                // console.log("Failed")
                toast.error("Failed to approve")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    return (
        <div className="home">
            <Sidebar />
            <div className='homeContainer'>
                <Navbar />
                <div className='container'>
                    <div className="row">
                        <div className="">
                            <Link to={"/final-valuation-request-list"}><FaBackward /></Link>
                        </div>
                    </div>

                    <div className=''>
                        <p>Product id: <strong>{ProductInfo.productId}</strong></p>
                        <p>Product name: <strong>{ProductInfo.nameProduct}</strong></p>
                        <p>Request id: <strong>{ProductInfo.valuationRequestId}</strong></p>
                        <p>Description: <strong>{ProductInfo.description}</strong></p>
                        <p>Estimate price min: <strong>{ProductInfo.estimatePriceMin}</strong></p>
                        <p>Estimate price max: <strong>{ProductInfo.estimatePriceMax}</strong></p>
                        <p>Product image: </p>
                        <div className="col-sm-3">
                            <Carousel>
                                {ProductInfo.productImages && ProductInfo.productImages.map((item, index) => (

                                    <Carousel.Item key={index}>
                                        <img
                                            // className="d-block w-100"
                                            src={item.imageUrl}
                                            alt={'photo'}
                                            style={{ height: '300px', width: '100%' }}
                                        />
                                    </Carousel.Item>

                                ))}
                            </Carousel>
                        </div>

                    </div>
                    <div className="col-sm-4 mt-3">
                        <div className="d-flex justify-content-center">
                            <Button className='btn-success mx-3' onClick={handleApprove}>
                                Approve
                            </Button>
                            <Button className='btn-danger mx-3'>
                                Reject
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
