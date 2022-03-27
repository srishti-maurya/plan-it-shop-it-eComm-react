import "./frontend/styles/style.css";
import MockAPI from "./frontend/components/MockAPI";
import { Routes, Route } from "react-router-dom";
import { Home, Login, Products, Cart, Logout } from "./frontend/pages/index";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mock" element={<MockAPI />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
