import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaBackward } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'

const ValuationRequestDetail = () => {

    const { id } = useParams()

    const [valuationRequest, setValuationRequest] = useState({
        memberId: '',
        estimatePriceMax: '',
        estimatePriceMin: '',
        valuationStatus: '',
        description: ''
    })

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const requestData = await axios.get(`http://localhost:8080/valuation/request/status/product-received/${id}`)
                setValuationRequest(requestData.data)
            } catch (error) {
                console.log("Error ai fetchRequest: ", error)
            }
        }
        fetchRequest()
    }, [id])

    return (
        <div className='container'>
            <div className="">
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
            </div>
        </div>
    )
}

export default ValuationRequestDetail
