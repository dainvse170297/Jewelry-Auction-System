import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './component/home/Home.jsx';
import Login from './component/auth/login/Login.jsx';
import Register from './component/auth/register/Register.jsx';
import CreateValuation from './component/valuation_request/create/CreateValuation.jsx';
import Header from './component/layout/header/Header.jsx';
import Selling from './component/selling/Selling.jsx';
import Footer from './component/layout/footer/Footer.jsx';

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
          </Routes>

          {/* <Footer /> */}
      </BrowserRouter>

    </>
  );
}

export default App;
