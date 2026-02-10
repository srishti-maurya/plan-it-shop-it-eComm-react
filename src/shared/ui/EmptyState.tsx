import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";

interface EmptyStateProps {
  image?: string;
  alt?: string;
  message?: string;
  title?: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({
  image,
  alt,
  message,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-12">
      {image && <img src={image} alt={alt || ""} className="w-72 max-w-full" />}
      {title && <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-200">{title}</h2>}
      {message && <p className="text-xl text-secondary dark:text-secondary-300">{message}</p>}
      {description && (
        <p className="max-w-md text-center text-gray-500 dark:text-slate-400">{description}</p>
      )}
      {action ? (
        action
      ) : (
        <Link to="/products">
          <Button size="sm">Shop Now</Button>
        </Link>
      )}
    </div>
  );
}
