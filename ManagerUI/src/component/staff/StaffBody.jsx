import React from 'react'
import { Link } from 'react-router-dom'

const StaffBody = () => {


    return (
        <div className="container">
            <div>
                <h1 className='text-center mt-3'>WELCOME TO COMPANY</h1>
                <h1 className='text-center mt-3'>You are <strong>Staff</strong></h1>
                <label htmlFor="">
                    <h5>Choose Your role:</h5>
                </label><br></br>

                <Link to={'/staff-function'} style={{ textDecoration: 'none' }}>
                    Staff
                </Link>
            </div>
        </div>
    )
}

export default StaffBody
