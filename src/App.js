import './App.css';
import {BrowserRouter  as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Navbar from './components/navbar/Navbar';
import SymbolLister from './components/symbol-list/SymbolLister';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path='/symbols' element={<SymbolLister />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;