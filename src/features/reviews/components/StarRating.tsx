import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-2xl",
};

export function StarRating({
  rating,
  onRatingChange,
  readonly = false,
  size = "md",
}: StarRatingProps) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const filled = i <= Math.floor(rating);
    const halfFilled = !filled && i === Math.ceil(rating) && rating % 1 >= 0.5;

    stars.push(
      <button
        key={i}
        type="button"
        className={`${sizeClasses[size]} ${
          readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
        } transition-transform text-amber-400`}
        onClick={() => !readonly && onRatingChange?.(i)}
        disabled={readonly}
        aria-label={`Rate ${i} star${i > 1 ? "s" : ""}`}
      >
        {filled ? (
          <FaStar />
        ) : halfFilled ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar className="text-gray-300" />
        )}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-0.5" role="group" aria-label="Rating">
      {stars}
    </div>
  );
}
