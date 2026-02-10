import { api } from "./api";
import type { AuthResponse } from "@/types";

interface LoginInput {
  email: string;
  password: string;
}

interface SignupInput {
  fullname: string;
  email: string;
  password: string;
  cnfpassword: string;
}

export async function login(input: LoginInput): Promise<AuthResponse> {
  const { data } = await api.post("/auth/login", input);
  return data;
}

export async function signup(input: SignupInput): Promise<AuthResponse> {
  const { data } = await api.post("/auth/signup", input);
  return data;
}

export async function googleAuth(credential: string): Promise<AuthResponse> {
  const { data } = await api.post("/auth/google", { credential });
  return data;
}
