import "./styles.css"
import {BrowserRouter  as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Navbar from './components/navbar/Navbar';
import SymbolList from './components/symbol-list/SymbolList';
import SymbolScreen from './components/symbol-sub/SymbolScreen';
import ExchangeList from './components/exchanges/ExchangeList';
import UniSymbolScreen from './components/uni-symbol-sub/UniSymbolScreen';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className='mainWrapper'>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/stock-market/US/:symbol" element={<SymbolScreen />} />
          <Route exact path='/:exchange' element={<ExchangeList />} />
          <Route exact path='/:exchangeType/:market' element={<SymbolList />} />
          <Route exact path="/:exchangeType/:market/:symbol" element={<UniSymbolScreen />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
