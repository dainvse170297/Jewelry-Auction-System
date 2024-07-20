import React, { useEffect, useState } from 'react'
import { Container, Modal } from 'react-bootstrap'
import { getAllLots } from '../../../services/apiService'
import { Button, LinearProgress } from '@mui/material'
import Paginator from '../../common/Paginator'
import LotDetail from './LotDetail'

const AllLots = () => {

    const [lots, setLots] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [lotId, setLotId] = useState(null)

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = lots.slice(indexOfFirstItem, indexOfLastItem);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (lotId) => {
        setLotId(lotId)
        setShow(true);
    }

    const calculateTotalPage = (itemsPerPage, items) => {
        const totalItem = items.length;
        return Math.ceil(totalItem / itemsPerPage);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        setIsLoading(true)
        const getLots = async () => {
            try {
                const response = await getAllLots()
                setLots(response)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        getLots()
    }, [])

    return (
        <>
            <h1 className='text-center'>All Lots</h1>
            <Container>
                {isLoading ? (
                    <LinearProgress />
                ) : (
                    <>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Jewelry Name</th>
                                    <th>Current Price</th>
                                    <th>Buy Now Price</th>
                                    <th>Status</th>
                                    <th>---</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((lot, index) => (
                                    <tr key={index}>
                                        <td>{lot.id}</td>
                                        <td>
                                            <img src={lot.product?.productImages[0]?.imageUrl} alt="Image" style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            {lot.product?.name}
                                        </td>
                                        <td>
                                            ${lot.currentPrice}
                                        </td>
                                        <td>
                                            ${lot.buyNowPrice}
                                        </td>
                                        <td>
                                            {lot.status}
                                        </td>
                                        <td>
                                            <Button variant='contained' color='primary' onClick={() => handleShow(lot.id)}>View</Button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        <Paginator
                            currentPage={currentPage}
                            totalPages={calculateTotalPage(itemsPerPage, lots)}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </Container>
            <Modal show={show} onHide={handleClose} size='xl' scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Lot Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LotDetail lotId={lotId} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outlined" color='error' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AllLots