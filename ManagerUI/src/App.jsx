import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import Home from './component/home/Home.jsx';
import StaffBody from './component/staff/StaffBody'
import ValuationRequestList from './component/staff/ValuationRequestList'
import StaffFunction from './component/staff/StaffFunction'
import ValuationRequestDetail from './component/staff/ValuationRequestDetail'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={<Home />} />
          <Route path='/staff' element={<StaffBody />} />
          <Route path='/staff-function' element={<StaffFunction />} />
          <Route path='/valuation-request' element={<ValuationRequestList />} />
          <Route path='/valuation-request-detail/:id' element={<ValuationRequestDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
