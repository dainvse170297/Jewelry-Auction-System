import React, { useEffect, useState } from 'react'
import '../../home/home.scss'
import Sidebar from '../../layout/sidebar/Sidebar'
import Navbar from '../../layout/navbar/Navbar'
import { Link, useParams } from 'react-router-dom'
import { FaBackward } from 'react-icons/fa'
import axios from 'axios'
import { Col } from 'react-bootstrap'

const AddLotToSession = () => {

    const [lot, setLot] = useState([])
    const { id } = useParams()

    useEffect(() => {
        const getLotById = async () => {
            try {
                await axios.get(`http://localhost:8080/lot/ready-lot/${id}`).then((res) => {
                    setLot(res.data)
                })
            } catch (error) {
                console.log("Error get lot detail by id: ", error)
            }
        }
        getLotById()
    }, [id])

    console.log(lot)

    return (
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="ms-5 me-5">
                    <div className="mt-3">
                        <Link to={"/ready-lots"}><FaBackward /></Link>
                    </div>
                    <h1 className='text-center mt-5'>Add Lot to Session</h1>
                    <div className="">
                        <h3>Lot Information</h3>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddLotToSession
