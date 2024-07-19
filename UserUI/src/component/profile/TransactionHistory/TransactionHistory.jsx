import React, { useEffect, useState } from 'react'
import { getTransactionHistory } from '../../../services/apiService';
import { LinearProgress } from '@mui/material';

const TransactionHistory = () => {
    const id = JSON.parse(localStorage.getItem("account")).memberId;
    const [transactionHistories, setTransactionHistories] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTransactionHistory = async () => {
            try {
                const response = await getTransactionHistory(id);
                setTransactionHistories(response);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchTransactionHistory
    }, [id])


    return (
        <>
            <table className='table'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Amount</th>
                        <th>Transaction Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactionHistories.map((transactionHistory, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{transactionHistory.amount}</td>
                            <td>{transactionHistory.creationTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default TransactionHistory