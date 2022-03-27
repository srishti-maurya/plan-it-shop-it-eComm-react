import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "./cart-context";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const initialState = localStorage.getItem("token");
  const [token, setToken] = useState(initialState || "");
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginInput, setLoginInput] = useState({});

  const logoutHandler = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/logout");
  };

  const loginRequest = (input) => {
    return axios.post(`/api/auth/login`, input);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginRequest(loginInput);
      localStorage.setItem("token", JSON.stringify(data.encodedToken));
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      setToken(data.encodedToken);
      setLoginInput({ email: "", password: "" });
      navigate("/");
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        userData,
        setUserData,
        isLoggedIn,
        setIsLoggedIn,
        logoutHandler,
        loginHandler,
        loginInput,
        setLoginInput,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
