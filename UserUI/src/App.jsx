import { BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom'
import CreateValuation from './component/CreateValuation.jsx';
import './App.scss'; 
import './index.scss'
import 'bootstrap/dist/css/bootstrap.css';
import Header from './component/Header.jsx';
import Home from './component/Home.jsx';

function App() {
    
  // <Router>
  //       <Routes>
  //         <Route path='/create-valuation' element={<ValuationRequest></ValuationRequest>}></Route>
  //       </Routes>
  //   </Router>
  return (
    <>
    <BrowserRouter>

      <div className="App">
        
        <header className="App-header">
          <Header />
        </header>

          <Routes>
            <Route path="/home" element={<Home />}> </Route>
            <Route path="/create-valuation" element={<CreateValuation />}></Route>
          </Routes>
      </div>
    </BrowserRouter>

    </>

  );
}

export default App;
