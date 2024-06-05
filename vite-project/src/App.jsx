import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import FinalValuationRequestList from './component/FinalValuationRequestList'
import FinalValuationRequestDetail from './component/FinalValuationRequestDetail'
import ManagerApprovalList from './component/ManagerApprovalList'
import ManagerApprovalDetail from './component/ManagerApprovalDetail'
import ValuationRequest from './component/ValuationRequest'
import ValuationRespone from './component/ValuationRespone'

function App() {
  return (

    <BrowserRouter>
      <div>
        <Route path='/final-valuation-request-list' element={<FinalValuationRequestList />} />
        <Route path='/final-valuation-request-detail/:id' element={<FinalValuationRequestDetail />} />
        <Route path='/manager-approval' element={<ManagerApprovalList />} />
        <Route path='/manager-approval-detail/:id' element={<ManagerApprovalDetail />} />
        <Route path='/valuation-request' element={<ValuationRequest />} />
        <Route path='/valuation-response' element={<ValuationRespone />} />

      </div>
    </BrowserRouter>

  )
}

export default App
