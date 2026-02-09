import { api } from "./api";
import type { Review, ReviewPayload, Product } from "@/types";

export interface ReviewResponse {
  review: Review;
  product: Product;
}

export async function getProductReviews(productId: string): Promise<Review[]> {
  const { data } = await api.get(`/products/${productId}/reviews`);
  return data.reviews;
}

export async function addReview(
  productId: string,
  payload: ReviewPayload
): Promise<ReviewResponse> {
  const { data } = await api.post(`/products/${productId}/reviews`, payload);
  return data;
}

export async function updateReview(
  productId: string,
  reviewId: string,
  payload: Partial<ReviewPayload>
): Promise<ReviewResponse> {
  const { data } = await api.put(
    `/products/${productId}/reviews/${reviewId}`,
    payload
  );
  return data;
}

export async function deleteReview(
  productId: string,
  reviewId: string
): Promise<{ message: string; product: Product }> {
  const { data } = await api.delete(
    `/products/${productId}/reviews/${reviewId}`
  );
  return data;
}
