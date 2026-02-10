import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as reviewsApi from "@/services/reviews.api";
import { successToast, errorToast } from "@/utils";
import type { ReviewPayload, Product } from "@/types";

export function useProductReviews(productId: string) {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: ({ signal }) => reviewsApi.getProductReviews(productId, signal),
    enabled: Boolean(productId),
    staleTime: 5 * 60 * 1000,
  });
}

export function useAddReview(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ReviewPayload) =>
      reviewsApi.addReview(productId, payload),
    onSuccess: ({ review, product }) => {
      queryClient.setQueryData(["reviews", productId], (old: unknown) =>
        Array.isArray(old) ? [...old, review] : [review]
      );
      queryClient.setQueryData<Product[]>(["products"], (old) =>
        old?.map((p) => (p._id === productId ? product : p))
      );
      queryClient.setQueryData(["product", productId], product);
      successToast("Review added successfully");
    },
    onError: (error: Error & { response?: { data?: { errors?: string[] } } }) => {
      const message =
        error.response?.data?.errors?.[0] || "Failed to add review";
      errorToast(message);
    },
  });
}

export function useUpdateReview(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reviewId,
      payload,
    }: {
      reviewId: string;
      payload: Partial<ReviewPayload>;
    }) => reviewsApi.updateReview(productId, reviewId, payload),
    onSuccess: ({ review, product }) => {
      queryClient.setQueryData(["reviews", productId], (old: unknown) =>
        Array.isArray(old)
          ? old.map((r) => (r._id === review._id ? review : r))
          : [review]
      );
      queryClient.setQueryData<Product[]>(["products"], (old) =>
        old?.map((p) => (p._id === productId ? product : p))
      );
      queryClient.setQueryData(["product", productId], product);
      successToast("Review updated successfully");
    },
    onError: (error: Error & { response?: { data?: { errors?: string[] } } }) => {
      const message =
        error.response?.data?.errors?.[0] || "Failed to update review";
      errorToast(message);
    },
  });
}

export function useDeleteReview(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: string) =>
      reviewsApi.deleteReview(productId, reviewId),
    onSuccess: ({ product }, reviewId) => {
      queryClient.setQueryData(["reviews", productId], (old: unknown) =>
        Array.isArray(old) ? old.filter((r) => r._id !== reviewId) : []
      );
      queryClient.setQueryData<Product[]>(["products"], (old) =>
        old?.map((p) => (p._id === productId ? product : p))
      );
      queryClient.setQueryData(["product", productId], product);
      successToast("Review deleted successfully");
    },
    onError: (error: Error & { response?: { data?: { errors?: string[] } } }) => {
      const message =
        error.response?.data?.errors?.[0] || "Failed to delete review";
      errorToast(message);
    },
  });
}
