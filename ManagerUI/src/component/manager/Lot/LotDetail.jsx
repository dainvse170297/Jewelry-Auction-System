import React, { useEffect, useState } from 'react'
import { getLotDetail } from '../../../services/apiService'
import { CircularProgress, Typography } from '@mui/material'
import { Card, Carousel, Container } from 'react-bootstrap'
import moment from 'moment/moment'

const LotDetail = ({ lotId }) => {

    const [lot, setLot] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        const getLot = async () => {
            try {
                const response = await getLotDetail(lotId)
                setLot(response)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        getLot()
    }, [])

    return (
        <>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <Container>
                    <div className="row">
                        <h3 className='text-center'>Lot Information</h3>
                        <div className="col-lg-5">
                            <Carousel>
                                {lot.product?.productImages?.map((image, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                            className="d-block w-100"
                                            src={image.imageUrl}
                                            alt='photo'
                                            style={{ height: '300px', width: '200px' }}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                            <Card>
                                <Card.Body>
                                    <Card.Title className='text-center'><strong>{lot.product?.name}</strong></Card.Title>
                                    <Card.Text>
                                        <em>{lot.product?.description}</em>
                                    </Card.Text>
                                    <Card.Text>
                                        {lot.product?.category?.name}
                                    </Card.Text>
                                    <Card.Text>
                                        Estimate Max Price: $<strong>{lot.product?.estimatePriceMax}</strong>
                                    </Card.Text>
                                    <Card.Text>
                                        Estimate Min Price: $<strong>{lot.product?.estimatePriceMin}</strong>
                                    </Card.Text>
                                    {lot.currentPrice && <>
                                        <Card.Text>
                                            Price: $<strong>{lot.currentPrice}</strong>
                                        </Card.Text>
                                    </>}

                                    <Card.Text>
                                        Buy Now Price: $<strong>{lot.buyNowPrice}</strong>
                                    </Card.Text>

                                    <Card.Text>
                                        Lot Status: <strong>{lot.status}</strong>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-lg-7">
                            <Typography variant='h5' gutterBottom>Auction Session</Typography>
                            <div className="">
                                {lot.auctionSession?.name}
                            </div>
                            <div className="">
                                Start Time: {moment(lot.auctionSession?.startTime).format('DD/MM/YYYY HH:mm')}
                            </div>
                            <div className="">
                                End Time: {moment(lot.auctionSession?.endTime).format('DD/MM/YYYY HH:mm')}
                            </div>
                            {lot.auctionSession?.status && <>
                                <div className="">
                                    Status: <strong>{lot.auctionSession?.status}</strong>
                                </div>
                            </>}

                            {lot.auctionSession?.staff?.fullname && <>
                                <div className="">
                                    Session Manager: <strong>{lot.auctionSession?.staff?.fullname}</strong>
                                </div>
                            </>}
                        </div>
                    </div>
                </Container>
            )}
        </>
    )
}

export default LotDetail