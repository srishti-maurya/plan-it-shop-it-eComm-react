import { useInfiniteProducts } from "@/features/products/hooks";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { ProductCard, SkeletonGrid } from "@/shared/components";
import { LoadingSpinner } from "@/shared/components";

export function ProductsGrid() {
  const { visibleProducts, isLoading, hasMore, loadMore } = useInfiniteProducts();

  const { sentinelRef } = useInfiniteScroll({
    onLoadMore: loadMore,
    hasMore,
    isLoading,
  });

  if (isLoading) return <SkeletonGrid />;

  if (visibleProducts.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <p className="text-gray-500 dark:text-slate-400">No products found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap justify-center gap-6">
        {visibleProducts.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </div>

      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center py-4">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
