import { api, signalToCancelToken } from "./api";
import type { Product, WishlistItem } from "@/types";

export async function getWishlistItems(signal?: AbortSignal): Promise<WishlistItem[]> {
  const { data } = await api.get("/user/wishlist", { cancelToken: signalToCancelToken(signal) });
  return data.wishlist;
}

export async function addToWishlist(product: Product): Promise<WishlistItem[]> {
  const { data } = await api.post("/user/wishlist", { product });
  return data.wishlist;
}

export async function removeFromWishlist(_id: string): Promise<WishlistItem[]> {
  const { data } = await api.delete(`/user/wishlist/${_id}`);
  return data.wishlist;
}
