import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { StarRating } from "./StarRating";
import { ReviewForm } from "./ReviewForm";
import { Button, ConfirmDialog } from "@/shared/ui";
import type { Review, ReviewPayload } from "@/types";

interface ReviewItemProps {
  review: Review;
  isOwner: boolean;
  onUpdate: (reviewId: string, payload: Partial<ReviewPayload>) => void;
  onDelete: (reviewId: string) => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

export function ReviewItem({
  review,
  isOwner,
  onUpdate,
  onDelete,
  isUpdating = false,
  isDeleting = false,
}: ReviewItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleUpdate = (payload: ReviewPayload) => {
    onUpdate(review._id, payload);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(review._id);
    setShowDeleteConfirm(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isEditing) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <h4 className="mb-3 font-medium dark:text-slate-100">Edit Your Review</h4>
        <ReviewForm
          onSubmit={handleUpdate}
          existingReview={review}
          isLoading={isUpdating}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-2 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium dark:text-slate-200">{review.userName}</span>
            <StarRating rating={review.rating} readonly size="sm" />
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-500">
            {formatDate(review.createdAt)}
            {review.updatedAt !== review.createdAt && " (edited)"}
          </p>
        </div>
        {isOwner && (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              disabled={isDeleting}
              aria-label="Edit review"
            >
              <FaEdit className="text-gray-500 dark:text-slate-400" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDeleteClick}
              disabled={isDeleting}
              aria-label="Delete review"
            >
              <FaTrash className="text-red-500" />
            </Button>
          </div>
        )}
      </div>
      <h4 className="mb-1 font-medium dark:text-slate-200">{review.title}</h4>
      <p className="text-gray-600 dark:text-slate-400">{review.comment}</p>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Review"
        message="Are you sure you want to delete this review? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
}
