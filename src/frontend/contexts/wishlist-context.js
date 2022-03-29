import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "./index";
import { successToast } from "../utils";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export function WishlistProvider({ children }) {
  const { token, isLoggedIn, navigate } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);

  function addToWishlist(product) {
    if (isLoggedIn) {
      (async function () {
        try {
          const response = await axios.post(
            "/api/user/wishlist",
            { product },
            {
              headers: {
                authorization: token,
              },
            }
          );
          setWishlistItems(response.data.wishlist);
          successToast("Item added to wishlist");
        } catch (error) {
          console.error("ERROR", error);
        }
      })();
    } else {
      navigate("/login");
    }
  }

  function getWishlistItems() {
    if (isLoggedIn) {
      (async function () {
        try {
          const response = await axios.get("/api/user/wishlist", {
            headers: {
              authorization: token,
            },
          });
          setWishlistItems(response.data.wishlist);
        } catch (error) {
          console.error("ERROR", error);
        }
      })();
    }
  }

  function deleteWishlistItem(_id) {
    (async function () {
      try {
        const response = await axios.delete(`/api/user/wishlist/${_id}`, {
          headers: {
            authorization: token,
          },
        });
        setWishlistItems(response.data.wishlist);
        successToast("Item removed from wishlist");
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        setWishlistItems,
        addToWishlist,
        getWishlistItems,
        deleteWishlistItem,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
