import { useMemo } from "react";
import { useRecentlyViewed } from "@/shared/hooks/useRecentlyViewed";
import { useProductsQuery } from "@/features/products/hooks";
import { ScrollRow } from "@/shared/components/ScrollRow";
import { ProductCard } from "@/shared/components/ProductCard";

const MAX_SUGGESTIONS = 10;

export function ContinueBrowsingSection() {
  const { productIds } = useRecentlyViewed();
  const { data: products = [] } = useProductsQuery();

  const suggestions = useMemo(() => {
    if (!productIds.length || !products.length) return [];

    const viewedSet = new Set(productIds);
    const viewedProducts = products.filter((p) => viewedSet.has(p._id));
    const categories = new Set(viewedProducts.map((p) => p.categoryName));

    return products
      .filter((p) => categories.has(p.categoryName) && !viewedSet.has(p._id))
      .slice(0, MAX_SUGGESTIONS);
  }, [productIds, products]);

  if (!suggestions.length) return null;

  return (
    <ScrollRow title="Continue Browsing">
      {suggestions.map((product) => (
        <div key={product._id} className="snap-start shrink-0">
          <ProductCard item={product} />
        </div>
      ))}
    </ScrollRow>
  );
}
