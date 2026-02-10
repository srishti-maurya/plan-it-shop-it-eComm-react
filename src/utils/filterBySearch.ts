import type { Product } from "@/types";

export function filterBySearch(products: Product[], searchTerm: string): Product[] {
  if (!searchTerm.trim()) {
    return products;
  }

  const term = searchTerm.toLowerCase().trim();

  return products.filter(
    (product) =>
      product.title.toLowerCase().includes(term) ||
      product.author.toLowerCase().includes(term)
  );
}
