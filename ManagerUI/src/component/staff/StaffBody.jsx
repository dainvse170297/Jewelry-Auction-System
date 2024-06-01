import React from 'react'
import { Link } from 'react-router-dom'

const StaffBody = () => {


    return (
        <div className="container">
            <div>
                <h1 className='text-center mt-3'>Welcome to COMPANY</h1>
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
