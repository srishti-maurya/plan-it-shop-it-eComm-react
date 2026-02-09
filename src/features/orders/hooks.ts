import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as ordersApi from "@/services/orders.api";
import { successToast } from "@/utils";
import type { Order, CreateOrderPayload } from "@/types";

export function useOrdersQuery() {
  const isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"));
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: ordersApi.getOrders,
    enabled: isLoggedIn,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useOrderByIdQuery(orderId: string) {
  const isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"));
  return useQuery<Order>({
    queryKey: ["orders", orderId],
    queryFn: () => ordersApi.getOrderById(orderId),
    enabled: isLoggedIn && Boolean(orderId),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderPayload: CreateOrderPayload) =>
      ordersApi.createOrder(orderPayload),
    onSuccess: (newOrder) => {
      queryClient.setQueryData<Order[]>(["orders"], (old = []) => [newOrder, ...old]);
      // Invalidate cart to reflect it being cleared
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      successToast("Order placed successfully!");
    },
  });
}
