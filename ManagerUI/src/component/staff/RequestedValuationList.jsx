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

    const handleDetail = (item) => {
        console.log("Detail: ", item)
        setCurrentItemsDetail(item)
    }

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
                    
                    <div className="col">
                        <div className="row">
                            <div className="col-sm-7 text-center">
                                <h2>Requested valuation request</h2>
                                <div className="row">
                                    <table class="table">
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
                                            {/* <tr>
                                                <th scope="row">1</th>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                            </tr> */}
                                            {currentItems.map((request, key) => (
                                                <>
                                                
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
                                                    {/* <div className="card">
                                                        <div className="card-body"> */}
                                                            {/* <p>Member Id: <strong>{request.memberId}</strong></p>
                                                            <p>Description: <strong>{request.description}</strong></p>
                                                            <div className="">
                                                                <Button className='btn-success' value={request.id} onClick={handleConfirm}>
                                                                        Confirm information
                                                                </Button> */}
                                                            {/* </div>
                                                        </div> */}
                                                    {/* </div> */}

                                                {/* // </div> */}
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
                                    {/* <div class="collapse" id="itemDetail"> */}
                                        {currentItemsDetail && (
                                            <>
                                                <div class="card card-body">
                                                    <p>Member Id: <strong>{currentItemsDetail.memberId}</strong></p>
                                                    <p>Description: <strong>{currentItemsDetail.description}</strong></p>
                                                    <div className="d-flex justify-content-center">
                                                        <Button className='btn-success' value={currentItemsDetail.id} onClick={handleConfirm}>
                                                            Confirm information
                                                        </Button>
                                                        <Button className='btn-danger ms-2' value={currentItemsDetail.id} onClick={handleConfirm}>

                                                        </Button>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                </div>
                                
                            </div>
                        </div>

                    
                    </div>

                    <div className="col-lg-3"></div>
                    <div className="col-lg-6">
                        
                       
                    </div>
                    <div className="col-lg-3"></div>
                    {/* )} */}
                </div>
            </div >
        </div>
    )
}

export default RequestedValuationList
