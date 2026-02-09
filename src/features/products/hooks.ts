import { useMemo, useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/app/hooks";
import { fetchProducts } from "@/services";
import { sortByPrice, filterByCategory, filterByPrice, filterByRating, filterBySearch } from "@/utils";
import type { Product } from "@/types";
import type { RootState } from "@/app/store";

export function useProductsQuery() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

const selectFilters = (state: RootState) => state.filters;

export function useFilteredProducts() {
  const { data: products = [], isLoading } = useProductsQuery();
  const filters = useAppSelector(selectFilters);

  const processedData = useMemo(() => {
    const sorted = sortByPrice(products, filters.sortBy);
    const byCategory = filterByCategory(
      sorted,
      filters.category.CONTEMPORARY_FICTION,
      filters.category.SELF_HELP,
      filters.category.BIOGRAPHIES_AUTOBIOGRAPHIES,
      filters.category.SPIRITUALITY,
      filters.category.MYTHOLOGY,
      filters.category.ALL_CATEGORY,
      filters.collections.BEST_SELLERS,
      filters.collections.NEW_RELEASES,
      filters.collections.EXPERT_PICKS
    );
    const byPrice = filterByPrice(byCategory, filters.filterPrice);
    const byRating = filterByRating(byPrice, filters.filterBy);
    return filterBySearch(byRating, filters.searchTerm);
  }, [products, filters]);

  return { processedData, data: products, isLoading, filters };
}

const ITEMS_PER_PAGE = 12;

export function useInfiniteProducts() {
  const { processedData, data, isLoading, filters } = useFilteredProducts();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [filters]);

  const visibleProducts = useMemo(() => {
    return processedData.slice(0, visibleCount);
  }, [processedData, visibleCount]);

  const hasMore = visibleCount < processedData.length;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  }, []);

  return {
    visibleProducts,
    totalFiltered: processedData.length,
    totalProducts: data.length,
    isLoading,
    hasMore,
    loadMore,
    filters,
  };
}
