import { api, signalToCancelToken } from "./api";
import type { Product, Category } from "@/types";

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const { data } = await api.get("/products", { cancelToken: signalToCancelToken(signal) });
  return data.products;
}

export async function fetchCategories(signal?: AbortSignal): Promise<Category[]> {
  const { data } = await api.get("/categories", { cancelToken: signalToCancelToken(signal) });
  return data.categories;
}

export async function fetchProduct(productId: string, signal?: AbortSignal): Promise<Product> {
  const { data } = await api.get(`/products/${productId}`, { cancelToken: signalToCancelToken(signal) });
  return data.product;
}
