import { api } from "./api";
import type { Order, CreateOrderPayload } from "@/types";

export async function getOrders(): Promise<Order[]> {
  const { data } = await api.get("/user/orders");
  return data.orders;
}

export async function getOrderById(orderId: string): Promise<Order> {
  const { data } = await api.get(`/user/orders/${orderId}`);
  return data.order;
}

export async function createOrder(orderPayload: CreateOrderPayload): Promise<Order> {
  const { data } = await api.post("/user/orders", { order: orderPayload });
  return data.order;
}
