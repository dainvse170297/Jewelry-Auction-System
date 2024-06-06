import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './valuationResponseList.scss'

const ValuationResponseList = () => {
    const { id } = useParams()
    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/response/view-valuation-response/${id}`)
                setData(response.data)
            } catch (error) {
                console.log("Error at fetchRequest: ", error)
            }
        }
        fetchRequest()
    }, [id])

    return (
        <div>
            {data && (
                <div className='valuationResponseList container-fluid'>
                    <div className="row d-flex justify-content-center">
                        <h2>Your response of valuation request</h2>
                    </div>
                    <div className="row">
                        {/* Response list */}
                        <div className="col-sm-8">
                            <div className="row d-flex justify-content-center">
                                <span>Valuation response</span>
                            </div>
                            <div className="row">
                                <div className="col px-5">
                                    <div className="finalValuate row">
                                        <p class="d-inline-flex gap-1">
                                            <button  type="button" class="btn btn-light" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                                Button with data-bs-target
                                            </button>
                                        </p>
                                        <div class="collapse" id="collapseExample">
                                            <div class="card card-body">
                                                
                                                <p>
                                                    This is your final valuation
                                                </p>
                                                <div className='d-inline-flex justify-content-center'>
                                                    <button type="button" class="btn btn-success px-3 mx-3">Accept</button>
                                                    <button type="button" class="btn btn-danger">Reject</button>
                                                </div>  

                                            </div>
                                        </div>
                                    </div>

                                    <div className="Preliminary row">
                                        dhuasygf
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Request list */}
                        <div className="col-sm-4">
                            <h2>Valuation Request</h2>
                        </div>

                    </div>




                    {/* <h2>Valuation Request</h2>
                    <p>{data.valuationRequestDTO.description}</p>
                    <p>Min Estimate: {data.valuationRequestDTO.estimatePriceMin}</p>
                    <p>Max Estimate: {data.valuationRequestDTO.estimatePriceMax}</p>

                    <h2>Product</h2>
                    <p>{data.productDTO.name}</p>
                    <p>{data.productDTO.description}</p>
                    <p>Min Estimate: {data.productDTO.estimatePriceMin}</p>
                    <p>Max Estimate: {data.productDTO.estimatePriceMax}</p>

                    <h2>Responses</h2>
                    {data.responseRequestValuationDTOS.map((response, index) => (
                        <div key={index}>
                            <p>Status: {response.status}</p>
                            <p>Min Valuation: {response.valuationPriceMin}</p>
                            <p>Max Valuation: {response.valuationPriceMax}</p>
                        </div>
                    ))} */}
                </div>
            )}
        </div>
    )
}

export default ValuationResponseList