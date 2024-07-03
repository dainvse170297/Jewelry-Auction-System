import React, { useEffect, useState } from 'react'
import { getMemberByProductId } from '../../../services/apiService'

const CustomerDetail = ({ productId, transferAmount }) => {

    const [owner, setOwner] = useState([])

    useEffect(() => {

        const fetchOwner = async () => {
            try {
                const response = await getMemberByProductId(productId)
                setOwner(response)
            } catch (error) {
                console.log(error)
            }
        }
        fetchOwner()

    }, [productId])

    return (
        <>
            <h4 className='text-center'>Owner Information</h4>
            <div className="container">
                <p>Owner Name: <strong>{owner.fullname}</strong></p>
                <p>Owner Email: <strong>{owner.email}</strong></p>
                <p>Owner Phone: <strong>{owner.phone}</strong></p>
                <p>Owner Phone: <strong>{owner.address}</strong></p>
                <hr />
                <h6 className='text-center'>Bank Information</h6>
                <p>Bank Name: <strong>{owner.creditCard?.bankName}</strong></p>
                <p>Bank Number: <strong>{owner.creditCard?.bankNumber}</strong></p>
                <p>Account Holder: <strong>{owner.creditCard?.accountHolder}</strong></p>
                <p>Amount: <strong>${transferAmount}</strong></p>
            </div>
        </>
    )
}

export default CustomerDetail