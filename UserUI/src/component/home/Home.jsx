import React from 'react';
import './home.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreateValuation from '../valuation_request/create/CreateValuation';

const Home = () =>{
    return (
        <>
            <div className="home">
                    <Routes>
                        <Route path='/create-valuation' element={<CreateValuation />} />
                    </Routes>

                <p>Welcome to the Home Page</p>   
            </div>     
        </>                  
    );
}

export default Home;