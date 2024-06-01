import axios, { toFormData } from 'axios';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter, Navigate} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function CreateValuation(){
 
    const navigate = useNavigate();

    const [valuation, setValuation] = useState({
        memberId: '1',
        description: '',
        estimateMin: '',
        estimateMax: '',
    });

    function handleDescriptionChange(e) {
        setValuation({
            ...valuation, 
            description: e.target.value });
    }

    function handleEstimateMinChange(e) {
        setValuation({
            ...valuation,
            estimateMin: e.target.value });
    }

    function handleEstimateMaxChange(e) {
        setValuation({
            ...valuation,
            estimateMax: e.target.value });
    }

    async function Create (e) {
        e.defaultPrevented
        console.log(valuation.description)
        console.log(valuation.estimateMin)
        console.log(valuation.estimateMax)
        console.log(valuation.memberId)

        const params = new URLSearchParams();
        params.append('memberId', '1');
        params.append('description', valuation.description);
        params.append('estimateMin', valuation.estimateMin);
        params.append('estimateMax', valuation.estimateMax);

        axios.post("http://localhost:8080/valuation/create", params)
        .then(response => {
            // console.log(response.data)
            // alert(response.data.message)
            alert("Valuation Request Sent")

        }).catch(error => {
            console.log(error)
            console.log(error.response)
            alert("Error")
        })
        
        navigate('/home')
    }

    return (
        <div>
            <form onSubmit={Create}>
                <div className="">
                    <label>
                        Description:
                        <input type="text" value={valuation.description} onChange={handleDescriptionChange} required />
                    </label>
                </div>
                
                <div className="">
                    <label>
                        Estimate Min:
                        <input type="number" value={valuation.estimateMin} onChange={handleEstimateMinChange} required />                    </label>
                </div>
                
                <div className="">
                    <label>
                        Estimate Max:
                        <input type="number" value={valuation.estimateMax} onChange={handleEstimateMaxChange} required />                    </label>
                </div>
                <div className="">
                    <button type="submit">Send</button>
                </div>
            </form>
        </div>
    );
};
