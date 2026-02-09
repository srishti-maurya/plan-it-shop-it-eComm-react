import { Server, Model, RestSerializer } from "miragejs";
import {
  loginHandler,
  signupHandler,
} from "./backend/controllers/AuthController";
import { googleAuthHandler } from "./backend/controllers/GoogleAuthController";
import {
  addItemToCartHandler,
  getCartItemsHandler,
  removeItemFromCartHandler,
  updateCartItemHandler,
  clearCartHandler,
} from "./backend/controllers/CartController";
import {
  getAddressesHandler,
  addAddressHandler,
  updateAddressHandler,
  deleteAddressHandler,
} from "./backend/controllers/AddressController";
import {
  getAllCategoriesHandler,
  getCategoryHandler,
} from "./backend/controllers/CategoryController";
import {
  getAllProductsHandler,
  getProductHandler,
} from "./backend/controllers/ProductController";
import {
  getProductReviewsHandler,
  addReviewHandler,
  updateReviewHandler,
  deleteReviewHandler,
} from "./backend/controllers/ReviewController";
import {
  addItemToWishlistHandler,
  getWishlistItemsHandler,
  removeItemFromWishlistHandler,
} from "./backend/controllers/WishlistController";
import {
  getOrdersHandler,
  getOrderByIdHandler,
  createOrderHandler,
} from "./backend/controllers/OrderController";
import { categories } from "./backend/db/categories";
import { products } from "./backend/db/products";
import { users } from "./backend/db/users";

export function makeServer({ environment = "development" } = {}) {
  return new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    models: {
      product: Model,
      category: Model,
      user: Model,
      cart: Model,
      wishlist: Model,
    },

    seeds(server) {
      server.logging = false;
      products.forEach((item) => {
        server.create("product", { ...item, reviews: [], reviewCount: 0 } as Record<string, unknown>);
      });

      users.forEach((item) =>
        server.create("user", { ...item, cart: [], wishlist: [], addresses: [], orders: [] } as Record<string, unknown>)
      );

      categories.forEach((item) => server.create("category", { ...item } as Record<string, unknown>));
    },

    routes() {
      this.namespace = "api";
      // auth routes (public)
      this.post("/auth/signup", signupHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));
      this.post("/auth/google", googleAuthHandler.bind(this));

      // products routes (public)
      this.get("/products", getAllProductsHandler.bind(this));
      this.get("/products/:productId", getProductHandler.bind(this));

      // categories routes (public)
      this.get("/categories", getAllCategoriesHandler.bind(this));
      this.get("/categories/:categoryId", getCategoryHandler.bind(this));

      // cart routes (private)
      this.get("/user/cart", getCartItemsHandler.bind(this));
      this.post("/user/cart", addItemToCartHandler.bind(this));
      this.delete("/user/cart", clearCartHandler.bind(this));
      this.post("/user/cart/:productId", updateCartItemHandler.bind(this));
      this.delete(
        "/user/cart/:productId",
        removeItemFromCartHandler.bind(this)
      );

      // address routes (private)
      this.get("/user/addresses", getAddressesHandler.bind(this));
      this.post("/user/addresses", addAddressHandler.bind(this));
      this.post("/user/addresses/:addressId", updateAddressHandler.bind(this));
      this.delete("/user/addresses/:addressId", deleteAddressHandler.bind(this));

      // wishlist routes (private)
      this.get("/user/wishlist", getWishlistItemsHandler.bind(this));
      this.post("/user/wishlist", addItemToWishlistHandler.bind(this));
      this.delete(
        "/user/wishlist/:productId",
        removeItemFromWishlistHandler.bind(this)
      );

      // order routes (private)
      this.get("/user/orders", getOrdersHandler.bind(this));
      this.get("/user/orders/:orderId", getOrderByIdHandler.bind(this));
      this.post("/user/orders", createOrderHandler.bind(this));

      // review routes
      this.get("/products/:productId/reviews", getProductReviewsHandler.bind(this));
      this.post("/products/:productId/reviews", addReviewHandler.bind(this));
      this.put("/products/:productId/reviews/:reviewId", updateReviewHandler.bind(this));
      this.delete("/products/:productId/reviews/:reviewId", deleteReviewHandler.bind(this));
    },
  });
}
