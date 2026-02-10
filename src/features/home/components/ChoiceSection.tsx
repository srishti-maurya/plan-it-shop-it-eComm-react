import { useFilteredProducts } from "@/features/products/hooks";
import { ProductCard, SkeletonGrid } from "@/shared/components";

export function ChoiceSection() {
  const { data, isLoading } = useFilteredProducts();

  return (
    <>
      <h2 className="mt-12 text-center text-2xl font-bold text-primary dark:text-primary-300 md:text-3xl">
        Plan it's Choice
      </h2>
      <div className="mx-4 mt-4 flex flex-wrap justify-center gap-6">
        {isLoading ? (
          <SkeletonGrid count={5} />
        ) : (
          data.slice(0, 5)?.map((item) => (
            <ProductCard key={item._id} item={item} />
          ))
        )}
      </div>
    </>
  );
}
