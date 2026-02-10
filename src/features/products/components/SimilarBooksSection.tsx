import { useMemo } from "react";
import { useProductsQuery } from "@/features/products/hooks";
import { ScrollRow } from "@/shared/components/ScrollRow";
import { ProductCard } from "@/shared/components/ProductCard";
import type { Product } from "@/types";

interface SimilarBooksSectionProps {
  product: Product;
}

export function SimilarBooksSection({ product }: SimilarBooksSectionProps) {
  const { data: products = [] } = useProductsQuery();

  const similarBooks = useMemo(() => {
    if (!products.length) return [];

    return products
      .filter(
        (p) =>
          p._id !== product._id &&
          (p.categoryName === product.categoryName ||
            p.author === product.author)
      )
      .sort((a, b) => {
        const aAuthorMatch = a.author === product.author ? 1 : 0;
        const bAuthorMatch = b.author === product.author ? 1 : 0;
        if (bAuthorMatch !== aAuthorMatch) return bAuthorMatch - aAuthorMatch;
        return parseFloat(b.rating) - parseFloat(a.rating);
      })
      .slice(0, 10);
  }, [products, product]);

  if (!similarBooks.length) return null;

  return (
    <ScrollRow title="Similar Books">
      {similarBooks.map((item) => (
        <div key={item._id} className="snap-start shrink-0">
          <ProductCard item={item} />
        </div>
      ))}
    </ScrollRow>
  );
}
