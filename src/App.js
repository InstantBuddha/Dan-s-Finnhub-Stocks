import './App.css';
import "./styles.css"
import {BrowserRouter  as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Navbar from './components/navbar/Navbar';
import SymbolLister from './components/symbol-list/SymbolLister';
import SymbolScreen from './components/symbol-sub/SymbolScreen';
import ExchangeLister from './components/exchanges/ExchangeLister';
import ExchangeCard from './components/exchanges/ExchangeCard';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className='mainWrapper'>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path='/stock-market' element={<SymbolLister />} />
          <Route exact path="/stock-market/:symbol" element={<SymbolScreen />} />
          <Route exact path='/:exchange' element={<ExchangeLister />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
