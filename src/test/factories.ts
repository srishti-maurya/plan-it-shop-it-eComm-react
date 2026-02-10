import type { Product, CartItem, WishlistItem } from "@/types";

let idCounter = 0;

export function createProduct(overrides: Partial<Product> = {}): Product {
  idCounter++;
  return {
    _id: `product-${idCounter}`,
    title: `Test Book ${idCounter}`,
    author: `Author ${idCounter}`,
    categoryName: "contemporary-fiction",
    price: "299",
    prevPrice: "499",
    discount: "40",
    rating: "4.5",
    bestseller: false,
    newRelease: false,
    expertPick: false,
    image: `/images/book-${idCounter}.jpg`,
    ...overrides,
  };
}

export function createCartItem(overrides: Partial<CartItem> = {}): CartItem {
  const product = createProduct(overrides);
  return {
    ...product,
    qty: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

export function createWishlistItem(overrides: Partial<WishlistItem> = {}): WishlistItem {
  const product = createProduct(overrides);
  return {
    ...product,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}
