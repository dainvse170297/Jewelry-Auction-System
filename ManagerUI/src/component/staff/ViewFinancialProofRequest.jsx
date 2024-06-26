import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css'
import Sidebar from '../layout/sidebar/Sidebar'
import '../home/home.scss'
import Navbar from '../layout/navbar/Navbar'

export default function ViewFinancialProofRequest() {
    const [financialRequestList, setFinancialRequestList] = useState([])
    const [openDropdown, isOpenDropdown] = useState(false)
    const [currentItems, setCurrentItems] = useState(null)
    const [financialProofAmount, setFinancialProofAmount] = useState({
        id: '',
        staffId: '',
        financialProofAmount: ''
    })
    const [rejectRequest, setRejectRequest] = useState({
        id: '',
        staffId: ''
    })
    const [filtedList, setFiltedList] = useState(financialRequestList)
    const [filterItems, setFilterItems] = useState('')

    const toggleDropdown = () => {
        isOpenDropdown(!openDropdown);
    };

    const handleAmountChange = (e) => {
        const { name, value } = e.target
        setFinancialProofAmount({
            ...financialProofAmount,
            [name]: value
        })
    }

    const handleFilter = (e) => {
        setFiltedList(financialRequestList)
        setFilterItems(e.target.value)
        if (e.target.value != '') {
            setFiltedList(financialRequestList.filter(item => item.status === e.target.value))
        }
        console.log(filterItems)
    }

    useEffect(() => {
        const getFinancialRequestList = async () => {
            try {
                axios.get('http://localhost:8080/financial-proof/get-all')
                    .then(response => {
                        setFinancialRequestList(response.data)
                    })
            } catch (error) {
                console.error(error.message)
            }
        }
        getFinancialRequestList()
    }, []);

    async function sendAmount() {
        try {
            const formData = new FormData();
            formData.append("id", financialProofAmount.id);
            formData.append("memberId", financialProofAmount.staffId);
            formData.append("financialProofAmount", financialProofAmount.financialProofAmount);

            const response = await axios
                .post(`http://localhost:8080/financial-proof/set-amount`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    console.log(response.data.message);
                    toast.success("Set Successfully!");
                })
                .catch((error) => {
                    console.log(error);
                    console.log(error.response);
                    toast.error("Set Failed!");
                });

            if (response.status === 200) {
                toast.success("Successfully");
                toast("Set Amount Successfully!");
                console.log(financialProofRequest);
            } else {
                toast.error("Error set amount!");
            }
        }
        catch (error) {
            console.log("Error: ", error);
        }
    }

    async function sendReject() {
        try {
            const formData = new FormData();
            formData.append("id", rejectRequest.id);
            formData.append("staffId", rejectRequest.staffId);

            const response = await axios
                .post(`http://localhost:8080/financial-proof/reject`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    console.log(response.data.message);
                    toast.success("Rejected!");
                })
                .catch((error) => {
                    console.log(error);
                    console.log(error.response);
                    toast.error("Failed!");
                });

            if (response.status === 200) {
                toast.success("Successfully");
                toast("Successfully!");
            } else {
                toast.error("Error!");
            }
        }
        catch (error) {
            console.log("Error: ", error);
        }
    }

    const handleCurrentItem = (item) => {
        console.log(item)
        setCurrentItems(item)
        setFinancialProofAmount({
            id: item.id,
            staffId: item.staffId,
            financialProofAmount: ''
        })
        setRejectRequest({
            id: item.id,
            staffId: item.staffId
        })
        toggleDropdown()
    }

    return (
        <div className='home'>
            <Sidebar />
            <div className='homeContainer'>
                <Navbar />
                <div className='ms-5 d-grid gap-3'>
                    <div className='w-75'>
                        <select className='form-select' value={filterItems} onChange={handleFilter}>
                            <option value="">Filter</option>
                            <option value="REQUESTED">REQUESTED</option>
                            <option value="PENDING_MANAGER_APPROVAL">PENDING MANAGER APPROVAL</option>
                            <option value="AVAILABLE">AVAILABLE</option>
                            <option value="REJECTED">REJECTED</option>
                            <option value="CANCELED">CANCELED</option>
                        </select>
                    </div>
                    <div className='border border-dark w-75 p-2 bg-light'>
                        {filtedList.map((item, index) => (
                            <div className='row row-col-3 justify-content-around' key={index}>
                                <div className='col col-lg-auto'>Time Request: {item.timeRequest}</div>
                                <div className='col col-lg-auto'>Status: {item.status}</div>
                                <div className='col col-lg-auto'> <button onClick={() => handleCurrentItem(item)}>View</button> </div>
                                {openDropdown && (
                                    <ul>
                                        <div className='row'>
                                            <div className='col-lg-6'>
                                                {currentItems.financialProofImages.map((image, index) => (
                                                    <div key={index}>
                                                        <img src={image} alt='picture' />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className='col-lg-6 align-items-center'>
                                                <div className='row'>
                                                    <h5>Enter Amount:</h5>
                                                </div>
                                                <div className='row row-col-3 justify-content-around'>
                                                    <div className='col-lg-auto'>
                                                        <input type='text' id='financialProofAmount' name='financialProofAmount'
                                                            value={financialProofAmount.financialProofAmount}
                                                            onChange={handleAmountChange} />
                                                    </div>
                                                    <div className='col-lg-auto'><button className='btn btn-success' onClick={() => sendAmount}>Send Amount</button></div>
                                                    <div className='col-lg-auto'><button className='btn btn-danger' onClick={() => sendReject}>Reject</button></div>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

