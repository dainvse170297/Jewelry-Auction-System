import React from 'react'
import { FaBackward } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import '../home/home.scss'
import Sidebar from '../layout/sidebar/Sidebar'
import Navbar from '../layout/navbar/Navbar'

const ManagerBody = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className='homeContainer'>
                <Navbar />
                <div className="mt-3 ms-3">
                    <div className="">
                        <label htmlFor="">
                            <h6>Manager's services</h6>
                        </label><br></br>
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
        </div>
    )
}


export default ManagerBody
