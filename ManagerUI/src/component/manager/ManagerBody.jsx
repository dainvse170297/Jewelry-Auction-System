import React from 'react'
import { FaBackward } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ManagerBody = () => {
    return (
        <div className="container">
            <div className="mt-3">
                <Link to={"/home"}><FaBackward /></Link>
            </div>
            <div>

                <h1 className='text-center mt-3'>WELCOME TO COMPANY</h1>
                <h1 className='text-center mt-3'>You are <strong>Manager</strong></h1>
                <label htmlFor="">
                </label><br></br>

                <div className="">
                    <Link to={'/create-auction'} style={{ textDecoration: 'none' }}>
                        Create Auction Session
                    </Link>
                </div>
                <div className="">
                    <Link to={'/ready-lots'} style={{ textDecoration: 'none' }}>
                        View Ready Lots
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default ManagerBody
