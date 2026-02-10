import { describe, it, expect } from "vitest";
import { filterByCategory } from "../filterByCategory";
import type { Product } from "@/types";

const products: Product[] = [
  {
    _id: "1", title: "Fiction Book", author: "A", categoryName: "contemporary-fiction",
    price: "200", prevPrice: "400", discount: "50", rating: "4",
    bestseller: true, newRelease: false, expertPick: false, image: "",
  },
  {
    _id: "2", title: "Self Help Book", author: "B", categoryName: "self-help",
    price: "300", prevPrice: "500", discount: "40", rating: "3",
    bestseller: false, newRelease: true, expertPick: false, image: "",
  },
  {
    _id: "3", title: "Mythology Book", author: "C", categoryName: "mythology",
    price: "250", prevPrice: "400", discount: "38", rating: "4.5",
    bestseller: false, newRelease: false, expertPick: true, image: "",
  },
];

describe("filterByCategory", () => {
  it("returns all products when no filters are selected", () => {
    const result = filterByCategory(products, false, false, false, false, false, false, false, false, false);
    expect(result).toHaveLength(3);
  });

  it("filters by contemporary fiction category", () => {
    const result = filterByCategory(products, true, false, false, false, false, false, false, false, false);
    expect(result).toHaveLength(1);
    expect(result[0]._id).toBe("1");
  });

  it("filters by self-help category", () => {
    const result = filterByCategory(products, false, true, false, false, false, false, false, false, false);
    expect(result).toHaveLength(1);
    expect(result[0]._id).toBe("2");
  });

  it("returns all products when ALL_CATEGORY is selected", () => {
    const result = filterByCategory(products, false, false, false, false, false, true, false, false, false);
    expect(result).toHaveLength(3);
  });

  it("filters by bestsellers collection", () => {
    const result = filterByCategory(products, false, false, false, false, false, false, true, false, false);
    expect(result).toHaveLength(1);
    expect(result[0]._id).toBe("1");
  });

  it("filters by new releases collection", () => {
    const result = filterByCategory(products, false, false, false, false, false, false, false, true, false);
    expect(result).toHaveLength(1);
    expect(result[0]._id).toBe("2");
  });

  it("filters by expert picks collection", () => {
    const result = filterByCategory(products, false, false, false, false, false, false, false, false, true);
    expect(result).toHaveLength(1);
    expect(result[0]._id).toBe("3");
  });

  it("combines category and collection filters", () => {
    const result = filterByCategory(products, true, false, false, false, false, false, false, true, false);
    expect(result).toHaveLength(2);
  });
});
