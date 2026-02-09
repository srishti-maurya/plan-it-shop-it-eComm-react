import { useInfiniteProducts } from "@/features/products/hooks";
import { useAppDispatch } from "@/app/hooks";
import {
  setSortBy,
  toggleCategory,
  toggleCollection,
  setRatingFilter,
  setPriceFilter,
  clearFilters,
} from "@/features/products/filtersSlice";
import { Checkbox } from "./Checkbox";
import { RadioButton } from "./RadioButton";
import { Button } from "@/shared/ui";

export function FiltersPanel() {
  const { visibleProducts, totalFiltered, totalProducts, filters } = useInfiniteProducts();
  const dispatch = useAppDispatch();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-primary">Filters</h2>
        <Button variant="outline" size="sm" onClick={() => dispatch(clearFilters())}>
          Clear
        </Button>
      </div>
      <hr />
      <p className="text-sm text-gray-500">
        Showing {visibleProducts.length} of {totalFiltered} products
        {totalFiltered !== totalProducts && ` (${totalProducts} total)`}
      </p>
      <hr />
      <div>
        <h3 className="mb-2 font-semibold text-primary">Price</h3>
        <input
          type="range"
          min="100"
          max="500"
          step="50"
          value={filters.filterPrice}
          onChange={(e) => dispatch(setPriceFilter(Number(e.target.value)))}
          className="w-full accent-secondary"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>150</span>
          <span>300</span>
          <span>450</span>
        </div>
      </div>
      <hr />
      <div>
        <h3 className="mb-2 font-semibold text-primary">Category</h3>
        <Checkbox
          checked={filters.category.ALL_CATEGORY}
          label="All"
          onChange={() => dispatch(toggleCategory("ALL_CATEGORY"))}
        />
        <Checkbox
          checked={filters.category.CONTEMPORARY_FICTION}
          label="Contemporary Fiction"
          onChange={() => dispatch(toggleCategory("CONTEMPORARY_FICTION"))}
        />
        <Checkbox
          checked={filters.category.SELF_HELP}
          label="Self Help"
          onChange={() => dispatch(toggleCategory("SELF_HELP"))}
        />
        <Checkbox
          checked={filters.category.SPIRITUALITY}
          label="Spirituality"
          onChange={() => dispatch(toggleCategory("SPIRITUALITY"))}
        />
        <Checkbox
          checked={filters.category.BIOGRAPHIES_AUTOBIOGRAPHIES}
          label="Biographies"
          onChange={() => dispatch(toggleCategory("BIOGRAPHIES_AUTOBIOGRAPHIES"))}
        />
        <Checkbox
          checked={filters.category.MYTHOLOGY}
          label="Mythology"
          onChange={() => dispatch(toggleCategory("MYTHOLOGY"))}
        />
      </div>
      <hr />
      <div>
        <h3 className="mb-2 font-semibold text-primary">Rating</h3>
        <RadioButton
          label="4.5 Stars & above"
          checked={filters.filterBy === "FOUR_POINT_FIVE_STARS"}
          onChange={() => dispatch(setRatingFilter("FOUR_POINT_FIVE_STARS"))}
        />
        <RadioButton
          label="4 Stars & above"
          checked={filters.filterBy === "FOUR_STARS"}
          onChange={() => dispatch(setRatingFilter("FOUR_STARS"))}
        />
        <RadioButton
          label="3 Stars & above"
          checked={filters.filterBy === "THREE_STARS"}
          onChange={() => dispatch(setRatingFilter("THREE_STARS"))}
        />
      </div>
      <hr />
      <div>
        <h3 className="mb-2 font-semibold text-primary">Sort by</h3>
        <label className="flex cursor-pointer items-center gap-2 py-1 text-sm">
          <input
            type="radio"
            name="price"
            checked={filters.sortBy === "LOW_TO_HIGH"}
            onChange={() => dispatch(setSortBy("LOW_TO_HIGH"))}
            className="accent-secondary"
          />
          Price - Low to High
        </label>
        <label className="flex cursor-pointer items-center gap-2 py-1 text-sm">
          <input
            type="radio"
            name="price"
            checked={filters.sortBy === "HIGH_TO_LOW"}
            onChange={() => dispatch(setSortBy("HIGH_TO_LOW"))}
            className="accent-secondary"
          />
          Price - High to Low
        </label>
      </div>
      <hr />
      <div>
        <h3 className="mb-2 font-semibold text-primary">Collections</h3>
        <Checkbox
          checked={filters.collections.BEST_SELLERS}
          label="Best Sellers"
          onChange={() => dispatch(toggleCollection("BEST_SELLERS"))}
        />
        <Checkbox
          checked={filters.collections.NEW_RELEASES}
          label="New Releases"
          onChange={() => dispatch(toggleCollection("NEW_RELEASES"))}
        />
        <Checkbox
          checked={filters.collections.EXPERT_PICKS}
          label="Expert Picks"
          onChange={() => dispatch(toggleCollection("EXPERT_PICKS"))}
        />
      </div>
    </div>
  );
}
