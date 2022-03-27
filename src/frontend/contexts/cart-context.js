import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "./index";
import { useNavigate } from "react-router-dom";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const { token, isLoggedIn } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

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
    } else {
      navigate("/login");
    }
  }

  function getCartItems() {
    if (isLoggedIn) {
      (async function () {
        try {
          const response = await axios.get("/api/user/cart", {
            headers: {
              authorization: token,
            },
          });
          setCartItems(response.data.cart);
        } catch (error) {
          console.error("ERROR", error);
        }
      })();
    }
  }

  function changeQty(_id, type) {
    (async function () {
      try {
        const response = await axios.post(
          `/api/user/cart/${_id}`,
          {
            action: {
              type: type,
            },
          },
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

  function deleteItems(_id) {
    (async function () {
      try {
        const response = await axios.delete(`/api/user/cart/${_id}`, {
          headers: {
            authorization: token,
          },
        });
        setCartItems(response.data.cart);
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        getCartItems,
        deleteItems,
        changeQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
