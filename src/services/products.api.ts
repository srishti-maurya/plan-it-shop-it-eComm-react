import { api } from "./api";
import type { Product, Category } from "@/types";

export async function fetchProducts(): Promise<Product[]> {
  const { data } = await api.get("/products");
  return data.products;
}

export async function fetchCategories(): Promise<Category[]> {
  const { data } = await api.get("/categories");
  return data.categories;
}
