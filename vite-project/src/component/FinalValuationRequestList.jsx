import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Pagination } from 'react-bootstrap'
import { FaBackward } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Paginator from '../common/Paginator'

export default function FinalValuationRequestList() {

    const [Finalvaluation, setFinalValuation] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(5)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
        console.log('New Page:', pageNumber)
    }

    useEffect(() => {
        // setIsLoading(true)
        const getList = async () => {

            try {
                axios.get("http://localhost:8080/valuation/get-all-final-valuations").then((result) => {
                    setFinalValuation(result.data)
                })

            } catch (error) {
                console.log("Error nek:", error.message)
                setErrorMsg("Error fetching data from server")
            }
        }
        getAll()

    }, [])

    const calculateTotalPage = (itemPerPage, Finalvaluation) => {
        const totalItem = Finalvaluation.length
        return Math.ceil(totalItem / itemPerPage)
    }

    const indexOfLastItem = currentPage * itemPerPage
    const indexOfFirstItem = indexOfLastItem - itemPerPage
    const currentItems = Finalvaluation.slice(indexOfFirstItem, indexOfLastItem)

    return (
        <div className='container'>
            <div className="row">
                <div className="">
                    <Link to={"/vị trí trang trước"}><FaBackward /></Link>
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
                                            <Link to={`/final-valuation-request-detail/${request.id}`} style={{ color: 'white', textDecoration: 'none' }}>
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
                            totalPages={calculateTotalPage(itemPerPage, Finalvaluation)}
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


