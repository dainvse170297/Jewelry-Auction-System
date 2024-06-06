import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { FaBackward } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import Paginator from '../../common/Paginator'

export default function ValuationRequest() {

    // memberID
    const { id } = useParams()

    const [ValuationRequest, setValuationRequest] = useState([])
    const [errorMsg, setErrorMsg] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(5)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
        console.log('New Page:', pageNumber)
    }

    useEffect(() => {
        // setIsLoading(true)
        const getInfo = async () => {

            try {
                axios.get(`http://localhost:8080/valuation/view-sent-request/${id}`).then((result) => {
                    setValuationRequest(result.data)
                })

            } catch (error) {
                console.log("Error:", error.message)
                setErrorMsg("Error fetching data from server")
            }
        }
        getInfo()

    }, [])

    const calculateTotalPage = (itemPerPage, ValuationRequest) => {
        const totalItem = ValuationRequest.length
        return Math.ceil(totalItem / itemPerPage)
    }

    const indexOfLastItem = currentPage * itemPerPage
    const indexOfFirstItem = indexOfLastItem - itemPerPage
    const currentItems = ValuationRequest.slice(indexOfFirstItem, indexOfLastItem)

    return (
        <div className='container'>
            <div className="row">
                <div className="">
                    <Link to={"/home"}><FaBackward /></Link>
                </div>
                {/* {isLoading ? (
                    <>
                        <CircularProgress />
                    </>
                ) : ( */}
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    {currentItems.map((request) => (
                        <div className="mb-3 mt-3" key={request.id}>
                            <div className="card">
                                <div className="card-body">
                                    <p>Member Id: <strong>{request.memberId}</strong></p>
                                    <p>Description: <strong>{request.description}</strong></p>
                                    <div className="">
                                        <Button className='btn-success'>
                                            <Link to={`/valuation-response/${request.id}`} style={{ color: 'white', textDecoration: 'none' }}>
                                                Confirm Information
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                    <div className="flex align-items-center justify-content-center">
                        <Paginator currentPage={currentPage}
                            totalPages={calculateTotalPage(itemPerPage, ValuationRequest)}
                            onPageChange={handlePageChange}
                        ></Paginator>
                    </div>
                </div>
                <div className="col-lg-3"></div>
                {/* )} */}
            </div>
        </div >
    )
}

