import "./frontend/styles/style.css";
import MockAPI from "./frontend/components/MockAPI";
import { Routes, Route } from "react-router-dom";
import { Home } from "./frontend/pages/Home";
import Products from "./frontend/pages/Products/Products";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mock" element={<MockAPI />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;
