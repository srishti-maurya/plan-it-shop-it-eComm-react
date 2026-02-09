import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaHeart, FaArrowLeft } from "react-icons/fa";
import { api } from "@/services/api";
import { useCartQuery, useAddToCart } from "@/features/cart/hooks";
import {
  useWishlistQuery,
  useAddToWishlist,
  useRemoveFromWishlist,
} from "@/features/wishlist/hooks";
import { useAuth } from "@/features/auth/hooks";
import {
  useProductReviews,
  useAddReview,
  useUpdateReview,
  useDeleteReview,
} from "@/features/reviews/hooks";
import {
  RatingSummary,
  ReviewForm,
  ReviewList,
} from "@/features/reviews/components";
import { Button, Badge } from "@/shared/ui";
import { LoadingSpinner } from "@/shared/components";
import type { Product, Review, ReviewPayload } from "@/types";

async function fetchProduct(productId: string): Promise<Product> {
  const { data } = await api.get(`/products/${productId}`);
  return data.product;
}

export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const { user, navigate, isLoggedIn } = useAuth();

  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId!),
    enabled: Boolean(productId),
  });

  const { data: reviews = [], isLoading: isLoadingReviews } = useProductReviews(
    productId!
  );
  const addReviewMutation = useAddReview(productId!);
  const updateReviewMutation = useUpdateReview(productId!);
  const deleteReviewMutation = useDeleteReview(productId!);

  const { data: cartItems = [] } = useCartQuery();
  const { data: wishlistItems = [] } = useWishlistQuery();
  const addToCartMutation = useAddToCart();
  const addToWishlistMutation = useAddToWishlist();
  const removeFromWishlistMutation = useRemoveFromWishlist();

  if (isLoadingProduct) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
        <Link to="/products" className="mt-4 text-primary hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  const inCart = cartItems.find((item) => item._id === product._id);
  const inWishlist = wishlistItems.find((item) => item._id === product._id);
  const userReview = reviews.find((r: Review) => r.userId === user?._id);
  const currentUserId = user?._id || null;

  const handleAddReview = (payload: ReviewPayload) => {
    addReviewMutation.mutate(payload);
  };

  const handleUpdateReview = (
    reviewId: string,
    payload: Partial<ReviewPayload>
  ) => {
    updateReviewMutation.mutate({ reviewId, payload });
  };

  const handleDeleteReview = (reviewId: string) => {
    deleteReviewMutation.mutate(reviewId);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link
        to="/products"
        className="mb-6 inline-flex items-center gap-2 text-gray-600 hover:text-primary"
      >
        <FaArrowLeft />
        Back to Products
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Image */}
        <div className="relative">
          <div className="aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-contain p-4"
            />
          </div>
          {product.bestseller && (
            <Badge
              variant="bestseller"
              className="absolute left-0 top-4 rounded-none rounded-r"
            >
              Best Seller
            </Badge>
          )}
          {product.newRelease && (
            <Badge
              variant="newRelease"
              className="absolute left-0 top-4 rounded-none rounded-r"
            >
              New Release
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="mt-1 text-lg text-gray-600">by {product.author}</p>

          <div className="mt-4">
            <RatingSummary
              rating={product.rating}
              reviewCount={product.reviewCount}
            />
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">
              ₹{product.price}
            </span>
            <span className="text-lg text-gray-400 line-through">
              ₹{product.prevPrice}
            </span>
            <span className="rounded bg-green-100 px-2 py-1 text-sm font-medium text-green-700">
              {product.discount}% off
            </span>
          </div>

          <div className="mt-8 flex gap-4">
            <Button
              size="lg"
              className="flex-1"
              onClick={() =>
                inCart
                  ? navigate("/cart")
                  : addToCartMutation.mutate(product)
              }
            >
              {inCart ? "Go to Cart" : "Add to Cart"}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                inWishlist
                  ? removeFromWishlistMutation.mutate(product._id)
                  : addToWishlistMutation.mutate(product)
              }
              aria-label={
                inWishlist ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              <FaHeart className={inWishlist ? "text-red-500" : ""} />
            </Button>
          </div>

          <div className="mt-8 border-t pt-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase">
              Category
            </h3>
            <p className="mt-1 text-gray-900 capitalize">
              {product.categoryName.replace(/-/g, " ")}
            </p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12 border-t pt-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Customer Reviews
        </h2>

        {/* Review Form */}
        {isLoggedIn ? (
          userReview ? (
            <div className="mb-8 rounded-lg bg-gray-50 p-4">
              <p className="text-gray-600">
                You have already reviewed this book. You can edit or delete your
                review below.
              </p>
            </div>
          ) : (
            <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="mb-4 text-lg font-medium">Write a Review</h3>
              <ReviewForm
                onSubmit={handleAddReview}
                isLoading={addReviewMutation.isPending}
              />
            </div>
          )
        ) : (
          <div className="mb-8 rounded-lg bg-gray-50 p-6 text-center">
            <p className="text-gray-600">
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>{" "}
              to write a review
            </p>
          </div>
        )}

        {/* Reviews List */}
        {isLoadingReviews ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <ReviewList
            reviews={reviews}
            currentUserId={currentUserId}
            onUpdate={handleUpdateReview}
            onDelete={handleDeleteReview}
            isUpdating={updateReviewMutation.isPending}
            isDeleting={deleteReviewMutation.isPending}
          />
        )}
      </div>
    </div>
  );
}
