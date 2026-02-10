import { api, signalToCancelToken } from "./api";
import type { Product, ProductPayload, AdminOrder, OrderStatus } from "@/types";

export interface AnalyticsData {
  totalProducts: number;
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  ordersByStatus: { status: string; count: number }[];
  productsByCategory: { category: string; count: number }[];
}

export async function adminGetProducts(signal?: AbortSignal): Promise<Product[]> {
  const { data } = await api.get("/admin/products", { cancelToken: signalToCancelToken(signal) });
  return data.products;
}

export async function adminCreateProduct(product: ProductPayload): Promise<Product> {
  const { data } = await api.post("/admin/products", product);
  return data.product;
}

export async function adminUpdateProduct(productId: string, product: Partial<ProductPayload>): Promise<Product> {
  const { data } = await api.put(`/admin/products/${productId}`, product);
  return data.product;
}

export async function adminDeleteProduct(productId: string): Promise<void> {
  await api.delete(`/admin/products/${productId}`);
}

export async function adminGetOrders(signal?: AbortSignal): Promise<AdminOrder[]> {
  const { data } = await api.get("/admin/orders", { cancelToken: signalToCancelToken(signal) });
  return data.orders;
}

export async function adminUpdateOrderStatus(orderId: string, status: OrderStatus): Promise<AdminOrder> {
  const { data } = await api.post(`/admin/orders/${orderId}/status`, { status });
  return data.order;
}

export async function adminGetAnalytics(signal?: AbortSignal): Promise<AnalyticsData> {
  const { data } = await api.get("/admin/analytics", { cancelToken: signalToCancelToken(signal) });
  return data.analytics;
}
