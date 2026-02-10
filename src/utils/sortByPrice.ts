import type { Product, SortDirection } from "@/types";

export function sortByPrice(data: Product[], sortBy: SortDirection): Product[] {
  if (sortBy === "HIGH_TO_LOW") {
    return [...data].sort((item1, item2) => Number(item2.price) - Number(item1.price));
  } else if (sortBy === "LOW_TO_HIGH") {
    return [...data].sort((item1, item2) => Number(item1.price) - Number(item2.price));
  } else return data;
}
