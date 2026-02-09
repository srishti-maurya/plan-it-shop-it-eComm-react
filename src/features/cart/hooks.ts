import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as cartApi from "@/services/cart.api";
import { successToast } from "@/utils";
import type { Product, CartItem } from "@/types";

export function useCartQuery() {
  const isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"));
  return useQuery<CartItem[]>({
    queryKey: ["cart"],
    queryFn: cartApi.getCartItems,
    enabled: isLoggedIn,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (product: Product) => {
      const isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"));
      if (!isLoggedIn) {
        navigate("/login");
        return Promise.reject(new Error("Not logged in"));
      }
      return cartApi.addToCart(product);
    },
    onSuccess: (cart) => {
      queryClient.setQueryData<CartItem[]>(["cart"], cart);
      successToast("Item added to cart");
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ _id, type }: { _id: string; type: string }) =>
      cartApi.updateCartItem(_id, type),
    onSuccess: (cart) => {
      queryClient.setQueryData<CartItem[]>(["cart"], cart);
      successToast("Quantity updated");
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (_id: string) => cartApi.removeFromCart(_id),
    onSuccess: (cart) => {
      queryClient.setQueryData<CartItem[]>(["cart"], cart);
      successToast("Item deleted from cart");
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cartApi.clearCart(),
    onSuccess: (cart) => {
      queryClient.setQueryData<CartItem[]>(["cart"], cart);
    },
  });
}
