import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import ValuationRequest from './component/ValuationRequest.jsx';
import './App.scss';
import './index.scss'
import 'bootstrap/dist/css/bootstrap.css';
import Home from './component/Home';
import Header from './component/header/Header.jsx';
import StaffBody from './component/staff/StaffBody'
import ValuationRequestList from './component/staff/ValuationRequestList'
import StaffFunction from './component/staff/StaffFunction'
import ValuationRequestDetail from './component/staff/ValuationRequestDetail'
import Layout from './component/layouts/Layout.jsx';

function App() {

  return (
    <>
      {/* <Router> */}

        <Layout />
        {/* <div className="App">

          <header className="App-header">
            <Header />
          </header>
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/create-valuation' element={<ValuationRequest />} />
            <Route path='/staff' element={<StaffBody />} />
            <Route path='/staff-function' element={<StaffFunction />} />
            <Route path='/valuation-request' element={<ValuationRequestList />} />
            <Route path='/valuation-request-detail/:id' element={<ValuationRequestDetail />} />
          </Routes>
        </div> */}
      {/* </Router> */}
    </>
  );
}

export default App;
