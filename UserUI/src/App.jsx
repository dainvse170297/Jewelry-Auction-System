import { BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom'
import ValuationRequest from './component/ValuationRequest.jsx';
import './App.scss'; 
import './index.scss'
import 'bootstrap/dist/css/bootstrap.css';
import Home from './component/Home';
import Header from './component/Header.jsx';

function App() {
    
  // <Router>
  //       <Routes>
  //         <Route path='/create-valuation' element={<ValuationRequest></ValuationRequest>}></Route>
  //       </Routes>
  //   </Router>
  return (
    <>
    <Router>

      <div className="App">
        
        <header className="App-header">
          <Header />
        </header>
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/create-valuation' element={<ValuationRequest />} />
          </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
