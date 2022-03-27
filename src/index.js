import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./frontend/contexts/data-context";
import { ProductsProvider } from "./frontend/contexts/products-context";
import { AuthProvider } from "./frontend/contexts/auth-context";
import { CartProvider } from "./frontend/contexts/cart-context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <CartProvider>
            <ProductsProvider>
              <App />
            </ProductsProvider>
          </CartProvider>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
