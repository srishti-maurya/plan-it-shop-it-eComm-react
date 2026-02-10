import { describe, it, expect } from "vitest";
import { filterByPrice } from "../filterByPrice";
import type { Product } from "@/types";

const products: Product[] = [
  {
    _id: "1", title: "A", author: "X", categoryName: "self-help",
    price: "200", prevPrice: "400", discount: "50", rating: "4",
    bestseller: false, newRelease: false, expertPick: false, image: "",
  },
  {
    _id: "2", title: "B", author: "Y", categoryName: "mythology",
    price: "350", prevPrice: "500", discount: "30", rating: "3",
    bestseller: false, newRelease: false, expertPick: false, image: "",
  },
  {
    _id: "3", title: "C", author: "Z", categoryName: "spirituality",
    price: "500", prevPrice: "700", discount: "29", rating: "5",
    bestseller: false, newRelease: false, expertPick: false, image: "",
  },
];

describe("filterByPrice", () => {
  it("returns all products when price is high enough", () => {
    const result = filterByPrice(products, 500);
    expect(result).toHaveLength(3);
  });

  it("filters products above the price threshold", () => {
    const result = filterByPrice(products, 300);
    expect(result).toHaveLength(1);
    expect(result[0]._id).toBe("1");
  });

  it("includes products at exactly the price threshold", () => {
    const result = filterByPrice(products, 350);
    expect(result).toHaveLength(2);
  });

  it("returns empty array when no products match", () => {
    const result = filterByPrice(products, 100);
    expect(result).toHaveLength(0);
  });
});
