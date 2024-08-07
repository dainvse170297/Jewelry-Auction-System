import React, { useEffect, useState } from 'react'
import { getAllDeliveredAuctionRegister, getAllWinnerPurchasedAuctionRegister } from '../../../services/apiService'
import { FaCashRegister, FaEye } from 'react-icons/fa'
import { Button, Modal } from 'react-bootstrap'
import CustomerDetail from './CustomerDetail'
import { LinearProgress } from '@mui/material'

const PaidList = () => {

    const [deliveredAuctionRegister, setDeliveredAuctionRegister] = useState([])

    const [show, setShow] = useState(false);

    const [isLoading, setIsLoading] = useState(true)

    const [productId, setProductId] = useState('')
    const [transferAmount, setTransferAmount] = useState(0)
    const [auctionRegisterId, setAuctionRegisterId] = useState('')


    const handleClose = () => setShow(false);

    const handleShow = (productId, transferAmount, auctionRegisterId) => {
        setTransferAmount(transferAmount)
        setProductId(productId)
        setAuctionRegisterId(auctionRegisterId)
        setShow(true);
    }


    useEffect(() => {
        setIsLoading(true)
        const fetchPaidList = async () => {
            try {
                const response = await getAllDeliveredAuctionRegister()
                setDeliveredAuctionRegister(response)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchPaidList()
    }, [])


    return (
        <>
            <h2 className='text-center'>Winner Purchased List</h2>
            <div className="container">
                {isLoading ? <LinearProgress /> :
                    <>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Jewelry Name</th>
                                    <th>Winner Price</th>
                                    <th>Winner Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {deliveredAuctionRegister.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.lot?.product?.name}</td>
                                        <td>${item.currentPrice}</td>
                                        <td>{item.member?.fullname}</td>
                                        <td>
                                            <button className='btn btn-warning' onClick={() => handleShow(item.lot?.product?.id, item.currentPrice, item.id)}><FaCashRegister /></button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </>
                }
            </div>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Transfer to Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CustomerDetail productId={productId} transferAmount={transferAmount} auctionRegisterId={auctionRegisterId} />

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

export default PaidList