import type { Product, RatingFilter } from "@/types";

export function filterByRating(data: Product[], filterBy: RatingFilter): Product[] {
  if (filterBy === "FOUR_POINT_FIVE_STARS") return data.filter((item) => Number(item.rating) >= 4.5);
  if (filterBy === "FOUR_STARS") return data.filter((item) => Number(item.rating) >= 4);
  if (filterBy === "THREE_STARS") return data.filter((item) => Number(item.rating) >= 3);
  return data;
}
