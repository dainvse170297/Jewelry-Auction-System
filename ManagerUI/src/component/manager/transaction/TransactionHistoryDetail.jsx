import React, { useEffect, useState } from 'react'
import { getMemberBySellerPaymentId } from '../../../services/apiService'
import { LinearProgress } from '@mui/material'

const TransactionHistoryDetail = ({ sellerPaymentId }) => {

    const [member, setMember] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        const getMember = async () => {
            try {
                const response = await getMemberBySellerPaymentId(sellerPaymentId);
                setMember(response)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }

        }
        getMember()
    }, [])

    return (
        <>
            {isLoading ? <LinearProgress /> :
                <>
                    <h4 className='text-center'>Seller Information</h4>
                    <div className="container">
                        <p>Name: <strong>{member.fullname}</strong></p>
                        <p>Email: <strong>{member.email}</strong></p>
                        <p>Phone: <strong>{member.phone}</strong></p>
                        <p>Address: <strong>{member.address}</strong></p>
                        <hr />
                        <h6 className='text-center'>Bank Information</h6>
                        <p>Bank Name: <strong>{member.creditCard?.bankName}</strong></p>
                        <p>Bank Number: <strong>{member.creditCard?.bankNumber}</strong></p>
                        <p>Account Holder: <strong>{member.creditCard?.accountHolder}</strong></p>
                    </div>
                </>
            }

        </>
    )
}

export default TransactionHistoryDetail