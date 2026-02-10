import { useMemo } from "react";
import { useRecentlyViewed } from "@/shared/hooks/useRecentlyViewed";
import { useProductsQuery } from "@/features/products/hooks";
import { ScrollRow } from "@/shared/components/ScrollRow";
import { ProductCard } from "@/shared/components/ProductCard";

export function RecentlyViewedSection() {
  const { productIds } = useRecentlyViewed();
  const { data: products = [] } = useProductsQuery();

  const recentProducts = useMemo(() => {
    if (!productIds.length || !products.length) return [];
    const productMap = new Map(products.map((p) => [p._id, p]));
    return productIds
      .map((id) => productMap.get(id))
      .filter(Boolean) as typeof products;
  }, [productIds, products]);

  if (!recentProducts.length) return null;

  return (
    <ScrollRow title="Recently Viewed">
      {recentProducts.map((product) => (
        <div key={product._id} className="snap-start shrink-0">
          <ProductCard item={product} />
        </div>
      ))}
    </ScrollRow>
  );
}
