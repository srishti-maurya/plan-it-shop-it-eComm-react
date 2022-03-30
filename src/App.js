import { PageRoutes } from "./frontend/routes/PageRoutes";
import "./frontend/styles/style.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <PageRoutes />
    </div>
  );
}

export default App;
