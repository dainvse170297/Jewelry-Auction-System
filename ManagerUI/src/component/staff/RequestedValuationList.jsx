import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Pagination } from 'react-bootstrap'
import { FaBackward } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Paginator from '../common/Paginator'
import { CircularProgress } from '@mui/material'
import Sidebar from '../layout/sidebar/Sidebar'
import '../home/home.scss'
import Navbar from '../layout/navbar/Navbar'
import { toast } from 'react-toastify'

const RequestedValuationList = () => {

    const [valuationRequests, setValuationRequests] = useState([])

    const [errorMsg, setErrorMsg] = useState('')

    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(5)


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
        console.log('New Page:', pageNumber)
    }

    useEffect(() => {
        // setIsLoading(true)
        const getAll = async () => {

            try {
                axios.get("http://localhost:8080/valuation/requested").then((result) => {
                    setValuationRequests(result.data)
                })
                // console.log("Valuation Request: ", valuationRequests.data)
                // setIsLoading(false)

            } catch (error) {
                console.log("Error nek:", error.message)
                setErrorMsg("Error fetching data from server")
                // setIsLoading(false)
            }
        }
        getAll()

    }, [])

    const handleConfirm = async (e) => {
        try {
            // const param = new URLSearchParams();
            // param.append("id", e.target.value)
            // console.log("Param: ", param)
            const id = e.target.value

            const response = await axios.post(`http://localhost:8080/valuation/product-received?id=${id}`);
            
            if (response.status === 200 && response.data.valuationStatus === "PRODUCT_RECEIVED") {
                console.log("Success")
                toast.success("Confirm product received successfully")
                setValuationRequests(valuationRequests.filter((request) => request.id !== id))
            }else{
                console.log("Failed")
            }

        } catch (error) {
            console.log("Error:", error.message)
            toast.error("Error when confirm product received")
        }
    }

    useEffect(() => {
        console.log("Valuation Request: ", valuationRequests)
    }, [valuationRequests])

    const calculateTotalPage = (itemPerPage, valuationRequests) => {
        const totalItem = valuationRequests.length
        return Math.ceil(totalItem / itemPerPage)
    }

    const indexOfLastItem = currentPage * itemPerPage
    const indexOfFirstItem = indexOfLastItem - itemPerPage
    const currentItems = valuationRequests.slice(indexOfFirstItem, indexOfLastItem)

    return (
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="ms-5">
                    <div className="">
                        <Link to={"/staff-function"}><FaBackward /></Link>
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
                                            <Button className='btn-success' value={request.id} onClick={handleConfirm}>
                                                    Confirm information
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                        <div className="flex align-items-center justify-content-center">
                            <Paginator currentPage={currentPage}
                                totalPages={calculateTotalPage(itemPerPage, valuationRequests)}
                                onPageChange={handlePageChange}
                            ></Paginator>
                        </div>
                    </div>
                    <div className="col-lg-3"></div>
                    {/* )} */}
                </div>
            </div >
        </div>
    )
}

export default RequestedValuationList
