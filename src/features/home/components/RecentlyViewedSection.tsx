import { useMemo } from "react";
import { useRecentlyViewed } from "@/shared/hooks/useRecentlyViewed";
import { useProductsQuery } from "@/features/products/hooks";
import { ScrollRow } from "@/shared/components/ScrollRow";
import { ProductCard } from "@/shared/components/ProductCard";
import { SkeletonCard } from "@/shared/components/SkeletonCard";

export function RecentlyViewedSection() {
  const { productIds } = useRecentlyViewed();
  const { data: products = [], isLoading } = useProductsQuery();

  const recentProducts = useMemo(() => {
    if (!productIds.length || !products.length) return [];
    const productMap = new Map(products.map((p) => [p._id, p]));
    return productIds
      .map((id) => productMap.get(id))
      .filter(Boolean) as typeof products;
  }, [productIds, products]);

  if (!productIds.length) return null;

  if (isLoading) {
    return (
      <ScrollRow title="Recently Viewed">
        {Array.from({ length: Math.min(productIds.length, 5) }, (_, i) => (
          <div key={i} className="snap-start shrink-0">
            <SkeletonCard />
          </div>
        ))}
      </ScrollRow>
    );
  }

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
