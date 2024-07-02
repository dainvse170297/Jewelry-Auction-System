import React, { useEffect, useState } from 'react'
import { getAllWinnerPurchasedAuctionRegister } from '../../../services/apiService'
import { FaCashRegister, FaEye } from 'react-icons/fa'
import { Button, Modal } from 'react-bootstrap'
import CustomerDetail from './CustomerDetail'

const PaidList = () => {

    const [purchasedAuctionRegister, setPurchasedAuctionRegister] = useState([])

    const [show, setShow] = useState(false);

    const [productId, setProductId] = useState('')
    const [transferAmount, setTransferAmount] = useState(0)


    const handleClose = () => setShow(false);

    const handleShow = (productId, transferAmount) => {
        setTransferAmount(transferAmount)
        setProductId(productId)
        setShow(true);
    }


    useEffect(() => {
        const fetchPaidList = async () => {
            try {
                const response = await getAllWinnerPurchasedAuctionRegister()
                setPurchasedAuctionRegister(response)
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
                <table className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Winner Price</th>
                            <th>Winner Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchasedAuctionRegister.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.lot?.product?.name}</td>
                                <td>${item.currentPrice}</td>
                                <td>{item.member?.fullname}</td>
                                <td>
                                    <button className='btn btn-warning' onClick={() => handleShow(item.lot?.product?.id, item.currentPrice)}><FaCashRegister /></button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Transfer to Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CustomerDetail productId={productId} transferAmount={transferAmount} />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Confirm Transfered
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default PaidList