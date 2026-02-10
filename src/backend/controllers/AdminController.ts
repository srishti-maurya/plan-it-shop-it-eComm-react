import { Response } from "miragejs";
import { v4 as uuid } from "uuid";
import { requiresAuth } from "../utils/authUtils";

/* eslint-disable @typescript-eslint/no-explicit-any */
type MirageSchema = any;
type MirageRequest = any;

function requiresAdmin(ctx: MirageSchema, request: MirageRequest) {
  const userId = requiresAuth.call(ctx, request);
  if (userId instanceof Response) return userId;
  const user = ctx.db.users.findBy({ _id: userId });
  if (!user || !user.isAdmin) {
    return new Response(403, {}, { errors: ["Forbidden. Admin access required."] });
  }
  return userId;
}

export const adminGetAllProductsHandler = function (
  this: MirageSchema,
  schema: MirageSchema,
  request: MirageRequest
) {
  const result = requiresAdmin(this, request);
  if (result instanceof Response) return result;
  const products = schema.products.all().models;
  return new Response(200, {}, { products });
};

export const adminCreateProductHandler = function (
  this: MirageSchema,
  schema: MirageSchema,
  request: MirageRequest
) {
  const result = requiresAdmin(this, request);
  if (result instanceof Response) return result;
  try {
    const productData = JSON.parse(request.requestBody);
    const newProduct = {
      ...productData,
      _id: uuid(),
      reviews: [],
      reviewCount: 0,
    };
    const created = schema.products.create(newProduct);
    return new Response(201, {}, { product: created.attrs });
  } catch (error) {
    return new Response(500, {}, { error });
  }
};

export const adminUpdateProductHandler = function (
  this: MirageSchema,
  schema: MirageSchema,
  request: MirageRequest
) {
  const result = requiresAdmin(this, request);
  if (result instanceof Response) return result;
  try {
    const productId = request.params.productId;
    const product = schema.products.findBy({ _id: productId });
    if (!product) {
      return new Response(404, {}, { errors: ["Product not found"] });
    }
    const updates = JSON.parse(request.requestBody);
    product.update(updates);
    return new Response(200, {}, { product: product.attrs });
  } catch (error) {
    return new Response(500, {}, { error });
  }
};

export const adminDeleteProductHandler = function (
  this: MirageSchema,
  schema: MirageSchema,
  request: MirageRequest
) {
  const result = requiresAdmin(this, request);
  if (result instanceof Response) return result;
  try {
    const productId = request.params.productId;
    const product = schema.products.findBy({ _id: productId });
    if (!product) {
      return new Response(404, {}, { errors: ["Product not found"] });
    }
    product.destroy();
    return new Response(200, {}, { message: "Product deleted" });
  } catch (error) {
    return new Response(500, {}, { error });
  }
};

export const adminGetAllOrdersHandler = function (
  this: MirageSchema,
  schema: MirageSchema,
  request: MirageRequest
) {
  const result = requiresAdmin(this, request);
  if (result instanceof Response) return result;
  const allUsers = schema.users.all().models;
  const allOrders: any[] = [];
  allUsers.forEach((user: any) => {
    const orders = user.orders ?? [];
    orders.forEach((order: any) => {
      allOrders.push({
        ...order,
        userId: user._id,
        userName: `${user.firstName} ${user.lastName}`,
      });
    });
  });
  allOrders.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return new Response(200, {}, { orders: allOrders });
};

export const adminUpdateOrderStatusHandler = function (
  this: MirageSchema,
  schema: MirageSchema,
  request: MirageRequest
) {
  const result = requiresAdmin(this, request);
  if (result instanceof Response) return result;
  try {
    const orderId = request.params.orderId;
    const { status } = JSON.parse(request.requestBody);
    const allUsers = schema.users.all().models;
    for (const user of allUsers) {
      const orders = user.orders ?? [];
      const orderIndex = orders.findIndex((o: any) => o._id === orderId);
      if (orderIndex !== -1) {
        orders[orderIndex] = { ...orders[orderIndex], status };
        this.db.users.update({ _id: user._id }, { orders: [...orders] });
        return new Response(200, {}, {
          order: {
            ...orders[orderIndex],
            userId: user._id,
            userName: `${user.firstName} ${user.lastName}`,
          },
        });
      }
    }
    return new Response(404, {}, { errors: ["Order not found"] });
  } catch (error) {
    return new Response(500, {}, { error });
  }
};

export const adminGetAnalyticsHandler = function (
  this: MirageSchema,
  schema: MirageSchema,
  request: MirageRequest
) {
  const result = requiresAdmin(this, request);
  if (result instanceof Response) return result;

  const products = schema.products.all().models;
  const allUsers = schema.users.all().models;

  let totalOrders = 0;
  let totalRevenue = 0;
  const statusCounts: Record<string, number> = {};
  const categoryCounts: Record<string, number> = {};

  allUsers.forEach((user: any) => {
    const orders = user.orders ?? [];
    totalOrders += orders.length;
    orders.forEach((order: any) => {
      totalRevenue += order.totalAmount || 0;
      statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
    });
  });

  products.forEach((product: any) => {
    const cat = product.categoryName;
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  const ordersByStatus = Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
  }));

  const productsByCategory = Object.entries(categoryCounts).map(([category, count]) => ({
    category,
    count,
  }));

  return new Response(200, {}, {
    analytics: {
      totalProducts: products.length,
      totalUsers: allUsers.length,
      totalOrders,
      totalRevenue,
      ordersByStatus,
      productsByCategory,
    },
  });
};
