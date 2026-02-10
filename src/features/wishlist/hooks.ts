import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as wishlistApi from "@/services/wishlist.api";
import { successToast } from "@/utils";
import type { Product, WishlistItem } from "@/types";

export function useWishlistQuery() {
  const isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"));
  return useQuery<WishlistItem[]>({
    queryKey: ["wishlist"],
    queryFn: ({ signal }) => wishlistApi.getWishlistItems(signal),
    enabled: isLoggedIn,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useAddToWishlist() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (product: Product) => {
      const isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"));
      if (!isLoggedIn) {
        navigate("/login");
        return Promise.reject(new Error("Not logged in"));
      }
      return wishlistApi.addToWishlist(product);
    },
    onSuccess: (wishlist) => {
      queryClient.setQueryData<WishlistItem[]>(["wishlist"], wishlist);
      successToast("Item added to wishlist");
    },
  });
}

export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (_id: string) => wishlistApi.removeFromWishlist(_id),
    onSuccess: (wishlist) => {
      queryClient.setQueryData<WishlistItem[]>(["wishlist"], wishlist);
      successToast("Item removed from wishlist");
    },
  });
}
