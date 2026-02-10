import axios from "axios";
import type { CancelToken } from "axios";

export function signalToCancelToken(signal?: AbortSignal): CancelToken | undefined {
  if (!signal) return undefined;
  const source = axios.CancelToken.source();
  signal.addEventListener("abort", () => source.cancel());
  return source.token;
}

export const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    // Remove quotes added by JSON.stringify
    config.headers.authorization = token.replace(/^"|"$/g, "");
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
