import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { successToast } from "../utils";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") || false
  );
  const [loginInput, setLoginInput] = useState({});
  const [signupInput, setSignupInput] = useState({});

  const logoutHandler = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/logout");
    successToast("Logout successful");
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
      setIsLoggedIn(true);
      successToast("Login successful");
      navigate("/");
      setLoginInput({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const signupRequest = (input) => {
    return axios.post(`/api/auth/signup`, input);
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signupRequest(signupInput);
      localStorage.setItem("token", JSON.stringify(data.encodedToken));
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      setToken(data.encodedToken);
      setIsLoggedIn(true);
      successToast("Signup successful");
      navigate("/");
      setSignupInput({
        fullname: "",
        email: "",
        password: "",
        cnfpassword: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        isLoggedIn,
        setIsLoggedIn,
        logoutHandler,
        loginHandler,
        loginInput,
        setLoginInput,
        navigate,
        signupInput,
        setSignupInput,
        signupHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
