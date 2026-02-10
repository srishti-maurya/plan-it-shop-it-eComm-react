import { ReviewItem } from "./ReviewItem";
import type { Review, ReviewPayload } from "@/types";

interface ReviewListProps {
  reviews: Review[];
  currentUserId: string | null;
  onUpdate: (reviewId: string, payload: Partial<ReviewPayload>) => void;
  onDelete: (reviewId: string) => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

export function ReviewList({
  reviews,
  currentUserId,
  onUpdate,
  onDelete,
  isUpdating = false,
  isDeleting = false,
}: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        No reviews yet. Be the first to review this book!
      </div>
    );
  }

  // Sort reviews: user's review first, then by date (newest first)
  const sortedReviews = [...reviews].sort((a, b) => {
    if (a.userId === currentUserId) return -1;
    if (b.userId === currentUserId) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-4">
      {sortedReviews.map((review) => (
        <ReviewItem
          key={review._id}
          review={review}
          isOwner={review.userId === currentUserId}
          onUpdate={onUpdate}
          onDelete={onDelete}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
}
