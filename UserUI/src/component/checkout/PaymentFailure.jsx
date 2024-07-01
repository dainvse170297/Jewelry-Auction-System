import React from 'react'

const PaymentFailure = () => {
    setTimeout(() => {
        window.location.href = '/home'
    }, 2000)
    return (
        <center>
            <div>
                <h2>Payment Failed</h2>
                <p>There was an issue processing your payment. Please try again.</p>
            </div>
        </center>
    )
}

export default PaymentFailure
