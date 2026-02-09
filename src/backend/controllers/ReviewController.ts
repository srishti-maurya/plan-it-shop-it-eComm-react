import { Response } from "miragejs";
import { v4 as uuid } from "uuid";
import { requiresAuth, formatDate } from "../utils/authUtils";
import type { Review } from "@/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
type MirageSchema = any;
type MirageRequest = any;

function recalculateRating(reviews: { rating: number }[]) {
  if (reviews.length === 0) return { averageRating: "0", reviewCount: 0 };
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return {
    averageRating: (sum / reviews.length).toFixed(1),
    reviewCount: reviews.length,
  };
}

export const getProductReviewsHandler = function (
  this: MirageSchema,
  _schema: MirageSchema,
  request: MirageRequest
) {
  const { productId } = request.params;
  const product = _schema.products.findBy({ _id: productId });

  if (!product) {
    return new Response(404, {}, { errors: ["Product not found"] });
  }

  return new Response(200, {}, { reviews: product.reviews || [] });
};

export const addReviewHandler = function (
  this: MirageSchema,
  _schema: MirageSchema,
  request: MirageRequest
) {
  const userId = requiresAuth.call(this, request);
  if (userId instanceof Response) {
    return userId;
  }

  const { productId } = request.params;
  const product = _schema.products.findBy({ _id: productId });

  if (!product) {
    return new Response(404, {}, { errors: ["Product not found"] });
  }

  const user = this.db.users.findBy({ _id: userId });
  if (!user) {
    return new Response(404, {}, { errors: ["User not found"] });
  }

  const reviews: Review[] = product.reviews || [];

  // Check if user already has a review for this product
  const existingReview = reviews.find((r: Review) => r.userId === userId);
  if (existingReview) {
    return new Response(
      400,
      {},
      { errors: ["You have already reviewed this product. You can edit your existing review."] }
    );
  }

  const { rating, title, comment } = JSON.parse(request.requestBody);

  if (!rating || rating < 1 || rating > 5) {
    return new Response(400, {}, { errors: ["Rating must be between 1 and 5"] });
  }

  if (!title || title.trim().length === 0) {
    return new Response(400, {}, { errors: ["Review title is required"] });
  }

  if (!comment || comment.trim().length === 0) {
    return new Response(400, {}, { errors: ["Review comment is required"] });
  }

  const now = formatDate();
  const newReview: Review = {
    _id: uuid(),
    userId,
    userName: `${user.firstName} ${user.lastName}`,
    rating,
    title: title.trim(),
    comment: comment.trim(),
    createdAt: now,
    updatedAt: now,
  };

  const updatedReviews = [...reviews, newReview];
  const { averageRating, reviewCount } = recalculateRating(updatedReviews);

  product.update({
    reviews: updatedReviews,
    rating: averageRating,
    reviewCount,
  });

  return new Response(201, {}, { review: newReview, product: product.attrs });
};

export const updateReviewHandler = function (
  this: MirageSchema,
  _schema: MirageSchema,
  request: MirageRequest
) {
  const userId = requiresAuth.call(this, request);
  if (userId instanceof Response) {
    return userId;
  }

  const { productId, reviewId } = request.params;
  const product = _schema.products.findBy({ _id: productId });

  if (!product) {
    return new Response(404, {}, { errors: ["Product not found"] });
  }

  const reviews: Review[] = product.reviews || [];
  const reviewIndex = reviews.findIndex((r: Review) => r._id === reviewId);

  if (reviewIndex === -1) {
    return new Response(404, {}, { errors: ["Review not found"] });
  }

  const review = reviews[reviewIndex];
  if (review.userId !== userId) {
    return new Response(403, {}, { errors: ["You can only modify your own reviews"] });
  }

  const { rating, title, comment } = JSON.parse(request.requestBody);

  if (rating !== undefined && (rating < 1 || rating > 5)) {
    return new Response(400, {}, { errors: ["Rating must be between 1 and 5"] });
  }

  if (title !== undefined && title.trim().length === 0) {
    return new Response(400, {}, { errors: ["Review title cannot be empty"] });
  }

  if (comment !== undefined && comment.trim().length === 0) {
    return new Response(400, {}, { errors: ["Review comment cannot be empty"] });
  }

  const updatedReview: Review = {
    ...review,
    rating: rating ?? review.rating,
    title: title?.trim() ?? review.title,
    comment: comment?.trim() ?? review.comment,
    updatedAt: formatDate(),
  };

  const updatedReviews = [...reviews];
  updatedReviews[reviewIndex] = updatedReview;
  const { averageRating, reviewCount } = recalculateRating(updatedReviews);

  product.update({
    reviews: updatedReviews,
    rating: averageRating,
    reviewCount,
  });

  return new Response(200, {}, { review: updatedReview, product: product.attrs });
};

export const deleteReviewHandler = function (
  this: MirageSchema,
  _schema: MirageSchema,
  request: MirageRequest
) {
  const userId = requiresAuth.call(this, request);
  if (userId instanceof Response) {
    return userId;
  }

  const { productId, reviewId } = request.params;
  const product = _schema.products.findBy({ _id: productId });

  if (!product) {
    return new Response(404, {}, { errors: ["Product not found"] });
  }

  const reviews: Review[] = product.reviews || [];
  const reviewIndex = reviews.findIndex((r: Review) => r._id === reviewId);

  if (reviewIndex === -1) {
    return new Response(404, {}, { errors: ["Review not found"] });
  }

  const review = reviews[reviewIndex];
  if (review.userId !== userId) {
    return new Response(403, {}, { errors: ["You can only delete your own reviews"] });
  }

  const updatedReviews = reviews.filter((r: Review) => r._id !== reviewId);
  const { averageRating, reviewCount } = recalculateRating(updatedReviews);

  product.update({
    reviews: updatedReviews,
    rating: averageRating,
    reviewCount,
  });

  return new Response(200, {}, { message: "Review deleted successfully", product: product.attrs });
};
