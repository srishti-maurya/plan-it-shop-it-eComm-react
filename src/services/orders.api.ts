import { api, signalToCancelToken } from "./api";
import type { Order, CreateOrderPayload } from "@/types";

export async function getOrders(signal?: AbortSignal): Promise<Order[]> {
  const { data } = await api.get("/user/orders", { cancelToken: signalToCancelToken(signal) });
  return data.orders;
}

export async function getOrderById(orderId: string, signal?: AbortSignal): Promise<Order> {
  const { data } = await api.get(`/user/orders/${orderId}`, { cancelToken: signalToCancelToken(signal) });
  return data.order;
}

export async function createOrder(orderPayload: CreateOrderPayload): Promise<Order> {
  const { data } = await api.post("/user/orders", { order: orderPayload });
  return data.order;
}
