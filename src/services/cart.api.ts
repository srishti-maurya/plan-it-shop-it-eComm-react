import { api, signalToCancelToken } from "./api";
import type { Product, CartItem } from "@/types";

export async function getCartItems(signal?: AbortSignal): Promise<CartItem[]> {
  const { data } = await api.get("/user/cart", { cancelToken: signalToCancelToken(signal) });
  return data.cart;
}

export async function addToCart(product: Product): Promise<CartItem[]> {
  const { data } = await api.post("/user/cart", { product });
  return data.cart;
}

export async function updateCartItem(
  _id: string,
  type: string
): Promise<CartItem[]> {
  const { data } = await api.post(`/user/cart/${_id}`, {
    action: { type },
  });
  return data.cart;
}

export async function removeFromCart(_id: string): Promise<CartItem[]> {
  const { data } = await api.delete(`/user/cart/${_id}`);
  return data.cart;
}

export async function clearCart(): Promise<CartItem[]> {
  const { data } = await api.delete("/user/cart");
  return data.cart;
}
