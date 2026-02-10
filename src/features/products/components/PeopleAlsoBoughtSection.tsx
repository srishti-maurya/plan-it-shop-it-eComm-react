import { useMemo } from "react";
import { useProductsQuery } from "@/features/products/hooks";
import { ScrollRow } from "@/shared/components/ScrollRow";
import { ProductCard } from "@/shared/components/ProductCard";
import type { Product } from "@/types";

interface PeopleAlsoBoughtSectionProps {
  product: Product;
}

export function PeopleAlsoBoughtSection({
  product,
}: PeopleAlsoBoughtSectionProps) {
  const { data: products = [] } = useProductsQuery();

  const recommendations = useMemo(() => {
    if (!products.length) return [];

    return products
      .filter(
        (p) =>
          p._id !== product._id &&
          p.categoryName !== product.categoryName &&
          p.author !== product.author
      )
      .map((p) => {
        let score = 0;
        if (p.bestseller) score += 3;
        if (p.expertPick) score += 2;
        if (parseFloat(p.rating) >= 4.0) score += 1;
        return { product: p, score };
      })
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return parseFloat(b.product.rating) - parseFloat(a.product.rating);
      })
      .slice(0, 10)
      .map((entry) => entry.product);
  }, [products, product]);

  if (!recommendations.length) return null;

  return (
    <ScrollRow title="People Also Bought">
      {recommendations.map((item) => (
        <div key={item._id} className="snap-start shrink-0">
          <ProductCard item={item} />
        </div>
      ))}
    </ScrollRow>
  );
}
