import "./styles/styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/navbar/Navbar";
import SymbolList from "./components/symbol-list/SymbolList";
import SymbolScreen from "./components/symbol-sub/SymbolScreen";
import ExchangeList from "./components/exchanges/ExchangeList";
import UniSymbolScreen from "./components/uni-symbol-sub/UniSymbolScreen";
import ErrorScreen from "./components/ErrorScreen";
import NotFound404 from "./components/NotFound404";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="mainWrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exchange/:exchange" element={<ExchangeList />} />
            <Route path="/:exchangeType/:market" element={<SymbolList />} />
            <Route
              path="/:exchangeType/:market/:symbol"
              element={<UniSymbolScreen />}
            />
            <Route path="/stock-market/US/:symbol" element={<SymbolScreen />} />
            <Route path="/error" element={<ErrorScreen />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
