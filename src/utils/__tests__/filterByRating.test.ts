import { describe, it, expect } from "vitest";
import { filterByRating } from "../filterByRating";
import type { Product } from "@/types";

const products: Product[] = [
  {
    _id: "1", title: "A", author: "X", categoryName: "self-help",
    price: "200", prevPrice: "400", discount: "50", rating: "4.5",
    bestseller: false, newRelease: false, expertPick: false, image: "",
  },
  {
    _id: "2", title: "B", author: "Y", categoryName: "mythology",
    price: "350", prevPrice: "500", discount: "30", rating: "4",
    bestseller: false, newRelease: false, expertPick: false, image: "",
  },
  {
    _id: "3", title: "C", author: "Z", categoryName: "spirituality",
    price: "500", prevPrice: "700", discount: "29", rating: "3",
    bestseller: false, newRelease: false, expertPick: false, image: "",
  },
  {
    _id: "4", title: "D", author: "W", categoryName: "mythology",
    price: "150", prevPrice: "300", discount: "50", rating: "2.5",
    bestseller: false, newRelease: false, expertPick: false, image: "",
  },
];

describe("filterByRating", () => {
  it("returns all products when filterBy is empty", () => {
    const result = filterByRating(products, "");
    expect(result).toHaveLength(4);
  });

  it("filters by 4.5 stars and above", () => {
    const result = filterByRating(products, "FOUR_POINT_FIVE_STARS");
    expect(result).toHaveLength(1);
    expect(result[0]._id).toBe("1");
  });

  it("filters by 4 stars and above", () => {
    const result = filterByRating(products, "FOUR_STARS");
    expect(result).toHaveLength(2);
  });

  it("filters by 3 stars and above", () => {
    const result = filterByRating(products, "THREE_STARS");
    expect(result).toHaveLength(3);
  });
});
