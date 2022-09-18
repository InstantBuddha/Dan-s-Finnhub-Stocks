import "./styles.css"
import {BrowserRouter  as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Navbar from './components/navbar/Navbar';
import SymbolLister from './components/symbol-list/SymbolList';
import SymbolScreen from './components/symbol-sub/SymbolScreen';
import ExchangeLister from './components/exchanges/ExchangeList';
import UniversalSymbolLister from './components/universal/UniversalSymbolLister';
import UniSymbolScreen from './components/uni-symbol-sub/UniSymbolScreen';

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
          <Route exact path='/:exchangeType/:market' element={<UniversalSymbolLister />} />
          <Route exact path="/:exchangeType/:market/:symbol" element={<UniSymbolScreen />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
