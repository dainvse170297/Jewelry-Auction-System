import React from 'react'

const PaymemtSuccess = () => {

    setTimeout(() => {
        window.location.href = '/home'
    }, 2000)

    return (
        <center>
            <div>
                <h2>Payment Successful</h2>
                <p>Your payment has been processed successfully.</p>
            </div>
        </center>
    )
}

export default PaymemtSuccess
