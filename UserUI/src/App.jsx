import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './component/home/Home.jsx';
import Login from './component/auth/login/Login.jsx';
import Register from './component/auth/register/Register.jsx';
import CreateValuation from './component/valuation_request/create/CreateValuation.jsx';
import Header from './component/layout/header/Header.jsx';
import Selling from './component/selling/Selling.jsx';
import ValuationRequest from './component/valuation_request/ValuationRequest.jsx';
import ValuationRespone from './component/valuation_response/ValuationResponse.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create-valuation' element={<CreateValuation />} />
          <Route path='/selling' element={<Selling />} />
          <Route path='/valuation-request/:id' element={<ValuationRequest />} />
          <Route path='/valuation-response/:id' element={<ValuationRespone />} />
        </Routes>

      </BrowserRouter>

    </>
  );
}

export default App;
