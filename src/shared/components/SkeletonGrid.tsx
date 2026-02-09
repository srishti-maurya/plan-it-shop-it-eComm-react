import { SkeletonCard } from "./SkeletonCard";

export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
