import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { getAllSellerPayment } from '../../../services/apiService'
import Loading from '../../../view/loading/Loading'
import Paginator from '../../common/Paginator'
import { Button } from '@mui/material'
import { Modal } from 'react-bootstrap'
import TransactionHistoryDetail from './TransactionHistoryDetail'

const TransactionHistory = () => {

    const [sellerPayment, setSellerPayment] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(7);

    const [paymentId, setPaymentId] = useState('')

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (paymentId) => {
        setPaymentId(paymentId)
        setShow(true);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = sellerPayment.slice(indexOfFirstItem, indexOfLastItem);

    const calculateTotalPage = (itemsPerPage, items) => {
        const totalItem = items.length;
        return Math.ceil(totalItem / itemsPerPage);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        setIsLoading(true)
        const getSellerPayments = async () => {
            try {
                const response = await getAllSellerPayment();
                setSellerPayment(response)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        getSellerPayments()
    }, [])

    return (
        <>
            <h2 className='text-center'>Transaction History</h2>
            <div className="container">
                {isLoading ?
                    <Loading />
                    :
                    <>
                        <table className='table table-hover'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Transfered Amount</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((payment, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{moment(payment.paymentDate).format("DD/MM/yyyy HH:ss:mm")}</td>
                                        <td>${payment.transferAmount}</td>
                                        <td>
                                            <Button
                                                onClick={() => handleShow(payment.id)}
                                                variant='contained'
                                                color='success'>
                                                View
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Paginator
                            currentPage={currentPage}
                            totalPages={calculateTotalPage(itemsPerPage, sellerPayment)}
                            onPageChange={handlePageChange}
                        />
                    </>
                }

            </div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Transfered to Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TransactionHistoryDetail sellerPaymentId={paymentId} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default TransactionHistory