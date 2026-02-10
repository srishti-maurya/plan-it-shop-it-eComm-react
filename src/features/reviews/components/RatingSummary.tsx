import { FaStar } from "react-icons/fa";

interface RatingSummaryProps {
  rating: string;
  reviewCount?: number;
}

export function RatingSummary({ rating, reviewCount = 0 }: RatingSummaryProps) {
  const ratingNum = parseFloat(rating) || 0;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 dark:bg-amber-900/20">
        <span className="text-xl font-bold text-amber-600 dark:text-amber-400">
          {ratingNum.toFixed(1)}
        </span>
        <FaStar className="text-amber-400" />
      </div>
      <span className="text-gray-500 dark:text-slate-400">
        {reviewCount === 0
          ? "No reviews yet"
          : reviewCount === 1
          ? "1 review"
          : `${reviewCount} reviews`}
      </span>
    </div>
  );
}
