import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Quote from "./pages/Quote";
import Schedule from "./pages/Schedule";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <strong className="brand">
          DoDigital 
        </strong>


        <div style={{ marginLeft: "auto", display: "flex", gap: "20px" }}>
          <Link to="/">Home</Link>
          <Link to="/quote">Get a Quote</Link>
          <Link to="/schedule">Schedule</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

