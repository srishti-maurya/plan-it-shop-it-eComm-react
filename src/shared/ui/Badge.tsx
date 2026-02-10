import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

const badgeVariants = cva("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold", {
  variants: {
    variant: {
      bestseller: "bg-amber-400 text-gray-900 dark:bg-amber-500/80 dark:text-gray-900",
      newRelease: "bg-secondary text-white dark:bg-secondary-400 dark:text-secondary-900",
      count: "bg-secondary text-white min-w-[1.25rem] justify-center dark:bg-secondary-400 dark:text-secondary-900",
    },
  },
});

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: ReactNode;
  className?: string;
}

export function Badge({ variant, children, className = "" }: BadgeProps) {
  return (
    <span className={`${badgeVariants({ variant })} ${className}`}>
      {children}
    </span>
  );
}
