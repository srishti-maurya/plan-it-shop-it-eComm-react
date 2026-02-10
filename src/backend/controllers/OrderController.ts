import { Response } from "miragejs";
import { v4 as uuid } from "uuid";
import { formatDate, requiresAuth } from "../utils/authUtils";

/* eslint-disable @typescript-eslint/no-explicit-any */
type MirageSchema = any;
type MirageRequest = any;

export const getOrdersHandler = function (this: MirageSchema, schema: MirageSchema, request: MirageRequest) {
  const userId = requiresAuth.call(this, request);
  if (!userId) {
    return new Response(404, {}, { errors: ["The email you entered is not Registered. Not Found error"] });
  }
  const user = schema.users.findBy({ _id: userId });
  const orders = user.orders ?? [];
  // Return orders sorted by date (newest first)
  const sortedOrders = [...orders].sort(
    (a: { createdAt: string }, b: { createdAt: string }) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return new Response(200, {}, { orders: sortedOrders });
};

export const getOrderByIdHandler = function (this: MirageSchema, schema: MirageSchema, request: MirageRequest) {
  const userId = requiresAuth.call(this, request);
  if (!userId) {
    return new Response(404, {}, { errors: ["The email you entered is not Registered. Not Found error"] });
  }
  const user = schema.users.findBy({ _id: userId });
  const orders = user.orders ?? [];
  const orderId = request.params.orderId;
  const order = orders.find((o: { _id: string }) => o._id === orderId);
  if (!order) {
    return new Response(404, {}, { errors: ["Order not found"] });
  }
  return new Response(200, {}, { order });
};

export const createOrderHandler = function (this: MirageSchema, schema: MirageSchema, request: MirageRequest) {
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      return new Response(404, {}, { errors: ["The email you entered is not Registered. Not Found error"] });
    }
    const user = schema.users.findBy({ _id: userId });
    const orders = user.orders ?? [];
    const { order: orderData } = JSON.parse(request.requestBody);

    const newOrder = {
      ...orderData,
      _id: uuid(),
      status: "confirmed",
      paymentStatus: orderData.paymentMethodId ? "completed" : "pending",
      createdAt: formatDate(),
    };

    orders.push(newOrder);
    this.db.users.update({ _id: userId }, { orders });

    // Clear the user's cart after creating an order
    this.db.users.update({ _id: userId }, { cart: [] });

    return new Response(201, {}, { order: newOrder });
  } catch (error) {
    return new Response(500, {}, { error });
  }
};
