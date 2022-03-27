import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "./index";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const { token, isLoggedIn } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product) {
    if (isLoggedIn) {
      (async function () {
        try {
          const response = await axios.post(
            "/api/user/cart",
            { product },
            {
              headers: {
                authorization: token,
              },
            }
          );
          setCartItems(response.data.cart);
        } catch (error) {
          console.error("ERROR", error);
        }
      })();
    }
  }

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
