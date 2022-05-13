import './App.css';
import "./styles.css"
import {BrowserRouter  as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Navbar from './components/navbar/Navbar';
import SymbolLister from './components/symbol-list/SymbolLister';
import SymbolScreen from './components/symbol-sub/SymbolScreen';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className='mainWrapper'>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path='/symbols' element={<SymbolLister />} />
          <Route exact path="/:symbol" element={<SymbolScreen />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
