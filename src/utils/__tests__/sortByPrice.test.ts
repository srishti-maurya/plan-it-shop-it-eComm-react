import { describe, it, expect } from "vitest";
import { sortByPrice } from "../sortByPrice";
import type { Product } from "@/types";

const products: Product[] = [
  {
    _id: "1", title: "A", author: "X", categoryName: "self-help",
    price: "300", prevPrice: "500", discount: "40", rating: "4",
    bestseller: false, newRelease: false, expertPick: false, image: "",
  },
  {
    _id: "2", title: "B", author: "Y", categoryName: "mythology",
    price: "150", prevPrice: "250", discount: "40", rating: "3",
    bestseller: false, newRelease: false, expertPick: false, image: "",
  },
  {
    _id: "3", title: "C", author: "Z", categoryName: "spirituality",
    price: "450", prevPrice: "600", discount: "25", rating: "5",
    bestseller: false, newRelease: false, expertPick: false, image: "",
  },
];

describe("sortByPrice", () => {
  it("returns data unchanged when sortBy is empty", () => {
    const result = sortByPrice(products, "");
    expect(result).toBe(products);
  });

  it("sorts low to high", () => {
    const result = sortByPrice(products, "LOW_TO_HIGH");
    expect(result.map((p) => p._id)).toEqual(["2", "1", "3"]);
  });

  it("sorts high to low", () => {
    const result = sortByPrice(products, "HIGH_TO_LOW");
    expect(result.map((p) => p._id)).toEqual(["3", "1", "2"]);
  });

  it("does not mutate the original array", () => {
    const original = [...products];
    sortByPrice(products, "LOW_TO_HIGH");
    expect(products).toEqual(original);
  });
});
