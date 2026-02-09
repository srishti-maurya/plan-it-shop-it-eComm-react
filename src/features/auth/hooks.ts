import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import jwt_decode from "jwt-decode";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setCredentials, clearCredentials } from "./authSlice";
import { login, signup, googleAuth } from "@/services";
import { successToast } from "@/utils";

interface DecodedToken {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export function useAuth() {
  const dispatch = useAppDispatch();
  const { token, isLoggedIn } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const user = useMemo(() => {
    if (!token) return null;
    try {
      const cleanToken = token.replace(/^"|"$/g, "");
      return jwt_decode<DecodedToken>(cleanToken);
    } catch {
      return null;
    }
  }, [token]);

  const logoutHandler = () => {
    dispatch(clearCredentials());
    queryClient.clear();
    navigate("/logout");
    successToast("Logout successful");
  };

  return { token, isLoggedIn, navigate, logoutHandler, user };
}

export function useLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (input: { email: string; password: string }) => login(input),
    onSuccess: (data) => {
      dispatch(setCredentials({ token: data.encodedToken }));
      successToast("Login successful");
      navigate("/");
    },
  });
}

export function useSignup() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (input: {
      fullname: string;
      email: string;
      password: string;
      cnfpassword: string;
    }) => signup(input),
    onSuccess: (data) => {
      dispatch(setCredentials({ token: data.encodedToken }));
      successToast("Signup successful");
      navigate("/");
    },
  });
}

export function useGoogleAuth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credential: string) => googleAuth(credential),
    onSuccess: (data) => {
      dispatch(setCredentials({ token: data.encodedToken }));
      successToast("Login successful");
      navigate("/");
    },
  });
}
