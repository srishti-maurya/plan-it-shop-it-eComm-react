import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary-600 rounded dark:bg-primary-300 dark:text-primary-900 dark:hover:bg-primary-200",
        secondary: "bg-secondary text-white hover:bg-secondary-600 rounded dark:bg-secondary-400 dark:text-secondary-900 dark:hover:bg-secondary-300",
        outline: "border-2 border-primary text-primary hover:bg-primary-50 rounded dark:border-primary-300 dark:text-primary-300 dark:hover:bg-slate-800",
        link: "text-primary underline-offset-4 hover:underline p-0 dark:text-primary-300",
        ghost: "hover:bg-gray-100 rounded dark:hover:bg-slate-700",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
        full: "w-full px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ variant, size, className = "", ...props }: ButtonProps) {
  return (
    <button className={`${buttonVariants({ variant, size })} ${className}`} {...props} />
  );
}
