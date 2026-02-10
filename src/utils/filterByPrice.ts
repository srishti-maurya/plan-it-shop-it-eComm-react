import type { Product } from "@/types";

export function filterByPrice(filteredData: Product[], price: number): Product[] {
  return filteredData.filter((item) => Number(item.price) <= price);
}
