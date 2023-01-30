import Singup from "./components/Singup";
import Singin from "./components/Singin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BillList from "./components/BillList";
import NotFound from "./components/NotFound";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/singup" element={<Singup />} />
          <Route path="/" element={<Singin />} />
          {/* <Route path="/" element={<Singin />} /> */}
          <Route path="/billList" element={<BillList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      {/* <Singup /> */}
      {/* <Singin /> */}
    </div>
  );
}

export default App;
