import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

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
        <div>
            {financialRequestList.map((item, index) => (
                <div key={index}>
                    <div>timeRequest: {item.timeRequest}</div>
                    <div>status:{item.status}</div>
                    <button onClick={() => handleCurrentItem(item)}>View</button>
                    {openDropdown && (
                        <ul>
                            <div>
                                <div>memberId: {currentItems != null ? currentItems.memberId : ''}</div>
                                <div>financialProofImages:{currentItems != null ? currentItems.financialProofImages.map((image, index) => (
                                    <div key={index}>
                                        <img src={image} alt='picture' />
                                    </div>
                                )) : ""}</div>
                                <input type='text' id='financialProofAmount' name='financialProofAmount' value={financialProofAmount.financialProofAmount}
                                    onChange={handleAmountChange} />
                                <button onClick={() => sendAmount}>Send Amount</button>
                                <button onClick={() => sendReject}>Reject</button>
                            </div>
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
}

