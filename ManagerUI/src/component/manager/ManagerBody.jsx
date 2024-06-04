import React from 'react'
import { Link } from 'react-router-dom'

const ManagerBody = () => {
    return (
        <div className="container">
            <div>

                <h1 className='text-center mt-3'>WELCOME TO COMPANY</h1>
                <h1 className='text-center mt-3'>You are <strong>Manager</strong></h1>
                <label htmlFor="">
                </label><br></br>

                <Link to={'/create-auction'} style={{ textDecoration: 'none' }}>
                    Create Auction Session
                </Link>
            </div>
        </div>
    )
}


export default ManagerBody
