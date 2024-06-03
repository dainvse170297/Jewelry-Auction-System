import React from 'react'
import { FaBackward } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const StaffFunction = () => {
    return (
        <div className='container'>
            <div className="">
                <Link to={"/staff"}><FaBackward /></Link>
            </div>
            <div className="mt-3">
                <label htmlFor="">
                    <h6>Staff's services</h6>
                </label><br></br>
                <Link to={'/valuation-request'} style={{ textDecoration: 'none' }}>
                    View All ProductReceived Valuation Requests
                </Link>
            </div>
        </div>
    )
}

export default StaffFunction
