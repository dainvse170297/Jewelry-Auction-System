import React from 'react'
import './checkout.scss'
import { Link } from '@mui/material'

const PaymentFailure = () => {

    return (
        <center>
            <div className='container mt-5'>
                <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="fr col-lg-6">

                        <div className="svg-container mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="200"
                                height="200" className="main-grid-item-icon"
                                fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                color='#B23842'
                                strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="15" x2="9" y1="9" y2="15" />
                                <line x1="9" x2="15" y1="9" y2="15" />
                            </svg>
                        </div>

                        <h2>Payment Failure !</h2>
                        <p>Please try again.</p>
                        <div className="d-flex justify-content-center">

                            <Link href="/home" underline="hover" className="me-5">
                                Home
                            </Link>
                            <Link href="/CheckOut" underline="hover">
                                Try Again!
                            </Link>

                        </div>
                    </div>

                    <div className="col-lg-3"></div>
                </div>
            </div>
        </center>
    )
}

export default PaymentFailure
