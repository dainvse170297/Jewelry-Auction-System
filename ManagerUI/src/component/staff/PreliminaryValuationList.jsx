import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { FaBackward } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Paginator from '../common/Paginator'
import Sidebar from '../layout/sidebar/Sidebar'
import '../home/home.scss'
import Navbar from '../layout/navbar/Navbar'
import {ToastContainer, toast } from 'react-toastify'

const PreliminaryValuationList = () => {

    const [valuationRequests, setValuationRequests] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(10)
    const [currentItemsDetail, setCurrentItemsDetail] = useState(null)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
        console.log('New Page:', pageNumber)
    }

    useEffect(() => {
        // setIsLoading(true)
        const getAll = async () => {

            try {
                axios.get("http://localhost:8080/valuation/get-preliminary-valuation").then((result) => {
                    setValuationRequests(result.data)
                })
            } catch (error) {
                setErrorMsg("Error fetching data from server")
            }
        }
        getAll()

    }, [])

    const handleDetail = (item) => {
        console.log("Detail: ", item)
        setCurrentItemsDetail(item)
    }

    const handleConfirm = async (e) => {
        try {
            const formData = new FormData()

            formData.append('id', currentItemsDetail.id)

            const response = await axios.post(`http://localhost:8080/valuation/product-received`, formData);
            
            if (response.status === 200 && response.data.valuationStatus === "PRODUCT_RECEIVED") {
                console.log("Success")
                toast.success("Confirm product received successfully")
                setValuationRequests(valuationRequests.filter((request) => request.id !== response.data.id))
                setCurrentItemsDetail(null)
            }else{
                console.log("Failed")
            }

        } catch (error) {
            console.log("Error:", error.message)
            toast.error("Error when confirm product received")
        }
    }

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
            <ToastContainer />
            <div className="homeContainer">
                <Navbar />
                <div className="ms-5">
                    
                    <div className="">
                        <Link to={"/staff-function"}><FaBackward /></Link>
                    </div>
                    
                    <div className="col">
                        <div className="row">
                            <div className="col-sm-7 text-center">
                                <h2>Requested valuation request</h2>
                                <div className="row">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">From</th>
                                            <th scope="col">Time</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                            {currentItems.map((request, key) => (
                                                <>
                                                    <tr>                                                       
                                                        <th scope="row">{key+1}</th>
                                                        <td>Member {request.memberId}</td>
                                                        <td>{request.timeRequest}</td>
                                                        <td>{request.valuationStatus}</td>
                                                        <td>
                                                            <button onClick={() => handleDetail(request)} className="btn btn-primary" type="button">
                                                                Detail
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>

                                <div className="row">
                                    <div className="flex align-items-center justify-content-center">
                                        <Paginator currentPage={currentPage}
                                            totalPages={calculateTotalPage(itemPerPage, valuationRequests)}
                                            onPageChange={handlePageChange}
                                        ></Paginator>
                                    </div>
                                </div>

                            </div>

                            <div className="col-sm-5">
                                <h3 className='text-center'>Valuation request detail</h3>
                                <div className="row px-5">
                                        {currentItemsDetail && (
                                            <>
                                                <div className="card card-body">
                                                    <p>Member Id: <strong>{currentItemsDetail.memberId}</strong></p>
                                                    <p>Description: <strong>{currentItemsDetail.description}</strong></p>
                                                    <p>Time request: <strong>{currentItemsDetail.timeRequest}</strong></p>
                                                    <p>Valuation status: <strong>{currentItemsDetail.valuationStatus}</strong></p>
                                                    <p>Estimate Minimum Price: <strong>{currentItemsDetail.estimatePriceMin}$</strong></p>
                                                    <p>Estimate Maximum Price: <strong>{currentItemsDetail.estimatePriceMax}$</strong></p>
                                                    <div className="col">
                                                        <div className="row-sm-9 d-flex justify-content-center">
                                                            <Button className='btn-success' onClick={handleConfirm}>
                                                                Confirm product received
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                </div>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div >
        </div>
    )
}

export default PreliminaryValuationList
