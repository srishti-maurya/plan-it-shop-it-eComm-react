import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as adminApi from "@/services/admin.api";
import { successToast, errorToast } from "@/utils";
import type { Product, ProductPayload, AdminOrder, OrderStatus } from "@/types";
import type { AnalyticsData } from "@/services/admin.api";

export function useAdminProductsQuery() {
  return useQuery<Product[]>({
    queryKey: ["admin", "products"],
    queryFn: ({ signal }) => adminApi.adminGetProducts(signal),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useAdminOrdersQuery() {
  return useQuery<AdminOrder[]>({
    queryKey: ["admin", "orders"],
    queryFn: ({ signal }) => adminApi.adminGetOrders(signal),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useAdminAnalyticsQuery() {
  return useQuery<AnalyticsData>({
    queryKey: ["admin", "analytics"],
    queryFn: ({ signal }) => adminApi.adminGetAnalytics(signal),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useAdminCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: ProductPayload) => adminApi.adminCreateProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      successToast("Product created successfully!");
    },
    onError: () => {
      errorToast("Failed to create product");
    },
  });
}

export function useAdminUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, product }: { productId: string; product: Partial<ProductPayload> }) =>
      adminApi.adminUpdateProduct(productId, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      successToast("Product updated successfully!");
    },
    onError: () => {
      errorToast("Failed to update product");
    },
  });
}

export function useAdminDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => adminApi.adminDeleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      successToast("Product deleted successfully!");
    },
    onError: () => {
      errorToast("Failed to delete product");
    },
  });
}

export function useAdminUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: OrderStatus }) =>
      adminApi.adminUpdateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "analytics"] });
      successToast("Order status updated!");
    },
    onError: () => {
      errorToast("Failed to update order status");
    },
  });
}
