import "./frontend/styles/style.css";
import MockAPI from "./frontend/components/MockAPI";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./frontend/pages/Home";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  async function getProducts() {
    try {
      const response = await axios.get("/api/products");
      const res = response.data.products;
      setData(res);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => getProducts(), []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route path="mock" element={<MockAPI />} />
      </Routes>
    </div>
  );
}

export default App;
