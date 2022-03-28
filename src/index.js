import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import {
  DataProvider,
  ProductsProvider,
  AuthProvider,
  CartProvider,
  WishlistProvider,
} from "./frontend/contexts";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <WishlistProvider>
            <CartProvider>
              <ProductsProvider>
                <App />
              </ProductsProvider>
            </CartProvider>
          </WishlistProvider>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
