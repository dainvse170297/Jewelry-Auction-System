import React, { useEffect, useState } from 'react'
import { getTransactionHistory } from '../../../services/apiService';
import { LinearProgress } from '@mui/material';
import moment from 'moment/moment';

const TransactionHistory = () => {
    const id = JSON.parse(localStorage.getItem("account")).memberId;
    const [transactionHistories, setTransactionHistories] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const fetchTransactionHistory = async () => {
            try {
                const response = await getTransactionHistory(id);
                setTransactionHistories(response);
                setIsLoading(false);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchTransactionHistory();
    }, [id])


    return (
        <>
            <h6>TRANSACTION HISTORY</h6>
            <hr />
            <table className='table'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Amount</th>
                        <th>Transaction Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {transactionHistories.map((transactionHistory, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>${transactionHistory.amount}</td>
                            <td>{moment(transactionHistory.creationTime).format("DD/MM/yyyy HH:ss:mm")}</td>
                            <td>
                                {transactionHistory.status === "SUCCESS" ? (
                                    <span className="text-success">Success</span>
                                ) : (
                                    <span className="text-danger">Failed</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isLoading && <LinearProgress color="error" />}
        </>
    )
}

export default TransactionHistory