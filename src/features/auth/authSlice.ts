import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isLoggedIn: Boolean(localStorage.getItem("isLoggedIn")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ token: string }>) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
    },
    clearCredentials(state) {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export const authReducer = authSlice.reducer;
