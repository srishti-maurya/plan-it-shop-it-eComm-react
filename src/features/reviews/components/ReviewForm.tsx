import { useState, useEffect } from "react";
import { StarRating } from "./StarRating";
import { Button, Input } from "@/shared/ui";
import type { Review, ReviewPayload } from "@/types";

interface ReviewFormProps {
  onSubmit: (payload: ReviewPayload) => void;
  existingReview?: Review;
  isLoading?: boolean;
  onCancel?: () => void;
}

export function ReviewForm({
  onSubmit,
  existingReview,
  isLoading = false,
  onCancel,
}: ReviewFormProps) {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [title, setTitle] = useState(existingReview?.title || "");
  const [comment, setComment] = useState(existingReview?.comment || "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating);
      setTitle(existingReview.title);
      setComment(existingReview.comment);
    }
  }, [existingReview]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (rating === 0) {
      newErrors.rating = "Please select a rating";
    }
    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }
    if (!comment.trim()) {
      newErrors.comment = "Review comment is required";
    } else if (comment.trim().length < 10) {
      newErrors.comment = "Review must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      rating,
      title: title.trim(),
      comment: comment.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Your Rating
        </label>
        <StarRating rating={rating} onRatingChange={setRating} size="lg" />
        {errors.rating && (
          <p className="mt-1 text-sm text-red-500">{errors.rating}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="review-title"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Review Title
        </label>
        <Input
          id="review-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summarize your experience"
          className={errors.title ? "border-red-500" : ""}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="review-comment"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Your Review
        </label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this book..."
          rows={4}
          className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            errors.comment ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.comment && (
          <p className="mt-1 text-sm text-red-500">{errors.comment}</p>
        )}
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? "Submitting..."
            : existingReview
            ? "Update Review"
            : "Submit Review"}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
