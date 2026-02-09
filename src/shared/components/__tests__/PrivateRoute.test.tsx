import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "@/features/auth/authSlice";
import { filtersReducer } from "@/features/products/filtersSlice";
import { PrivateRoute } from "../PrivateRoute";

function renderRoute(isLoggedIn: boolean, route: string) {
  const store = configureStore({
    reducer: { auth: authReducer, filters: filtersReducer },
    preloadedState: {
      auth: {
        token: isLoggedIn ? '"test-token"' : null,
        isLoggedIn,
      },
    },
  });

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path="/login" element={<div>Login Page</div>} />
            <Route element={<PrivateRoute />}>
              <Route path="/cart" element={<div>Cart Page</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );
}

describe("PrivateRoute", () => {
  it("renders child route when logged in", () => {
    renderRoute(true, "/cart");
    expect(screen.getByText("Cart Page")).toBeInTheDocument();
  });

  it("redirects to login when not logged in", () => {
    renderRoute(false, "/cart");
    expect(screen.getByText("Login Page")).toBeInTheDocument();
    expect(screen.queryByText("Cart Page")).not.toBeInTheDocument();
  });
});
