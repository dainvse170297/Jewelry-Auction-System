import axios from 'axios'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getPaymentCallback } from '../../services/apiService'

const PaymentCallback = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const auctionRegisterIds = localStorage.getItem('auctionRegisterIds')
    useEffect(() => {
        const handlePaymentCallback = async () => {
            const params = new URLSearchParams(location.search)
            const vnp_ResponseCode = params.get('vnp_ResponseCode')


            try {
                const response = await getPaymentCallback(vnp_ResponseCode, auctionRegisterIds)
                if (response && response.data.code === '00') {
                    navigate('/payment-success')
                    localStorage.removeItem('auctionRegisterIds')
                } else {
                    navigate('/payment-failure')
                    localStorage.removeItem('auctionRegisterIds')
                }
            } catch (error) {
                console.error('Error processing payment:', error)
                navigate('/payment-failure')
                localStorage.removeItem('auctionRegisterIds')
            }
        }
        handlePaymentCallback()
    }, [location.search, navigate])

    return (
        <div>Processing payment...</div>
    )
}

export default PaymentCallback
