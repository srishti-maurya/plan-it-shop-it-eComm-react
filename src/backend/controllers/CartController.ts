import { Response } from "miragejs";
import { formatDate, requiresAuth } from "../utils/authUtils";

/* eslint-disable @typescript-eslint/no-explicit-any */
type MirageSchema = any;
type MirageRequest = any;

export const getCartItemsHandler = function (this: MirageSchema, schema: MirageSchema, request: MirageRequest) {
  const userId = requiresAuth.call(this, request);
  if (!userId) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  const userCart = schema.users.findBy({ _id: userId }).cart;
  return new Response(200, {}, { cart: userCart });
};

export const addItemToCartHandler = function (this: MirageSchema, schema: MirageSchema, request: MirageRequest) {
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const userCart = schema.users.findBy({ _id: userId }).cart;
    const { product } = JSON.parse(request.requestBody);
    userCart.push({
      ...product,
      createdAt: formatDate(),
      updatedAt: formatDate(),
      qty: 1,
    });
    this.db.users.update({ _id: userId }, { cart: userCart });
    return new Response(201, {}, { cart: userCart });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

export const removeItemFromCartHandler = function (this: MirageSchema, schema: MirageSchema, request: MirageRequest) {
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    let userCart = schema.users.findBy({ _id: userId }).cart;
    const productId = request.params.productId;
    userCart = userCart.filter((item: { _id: string }) => item._id !== productId);
    this.db.users.update({ _id: userId }, { cart: userCart });
    return new Response(200, {}, { cart: userCart });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

export const updateCartItemHandler = function (this: MirageSchema, schema: MirageSchema, request: MirageRequest) {
  const productId = request.params.productId;
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    let userCart = schema.users.findBy({ _id: userId }).cart;
    const { action } = JSON.parse(request.requestBody);
    if (action.type === "increment") {
      userCart.forEach((product: { _id: string; qty: number; updatedAt: string }) => {
        if (product._id === productId) {
          product.qty += 1;
          product.updatedAt = formatDate();
        }
      });
    } else if (action.type === "decrement") {
      userCart.forEach((product: { _id: string; qty: number; updatedAt: string }) => {
        if (product._id === productId) {
          product.qty -= 1;
          product.updatedAt = formatDate();
        }
      });
      const filtered = userCart.filter((product: { _id: string; qty: number }) =>
        product._id === productId ? product.qty > 0 : true
      );
      userCart = filtered;
    }
    this.db.users.update({ _id: userId }, { cart: userCart });
    return new Response(200, {}, { cart: userCart });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

export const clearCartHandler = function (this: MirageSchema, _schema: MirageSchema, request: MirageRequest) {
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      return new Response(404, {}, { errors: ["The email you entered is not Registered. Not Found error"] });
    }
    this.db.users.update({ _id: userId }, { cart: [] });
    return new Response(200, {}, { cart: [] });
  } catch (error) {
    return new Response(500, {}, { error });
  }
};
