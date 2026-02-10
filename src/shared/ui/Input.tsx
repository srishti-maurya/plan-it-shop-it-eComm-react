import { forwardRef, useId, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = "", ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-slate-200">
            {label}
            {props.required && <span className="text-error-400 ml-0.5" aria-hidden="true">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={errorId}
          className={`w-full rounded border px-3 py-2 text-sm outline-none transition-colors focus:border-secondary focus:ring-1 focus:ring-secondary dark:bg-slate-800 dark:border-slate-600 dark:text-gray-100 dark:placeholder-slate-400 ${
            error ? "border-error-400" : "border-gray-300"
          } ${className}`}
          {...props}
        />
        {error && (
          <p id={errorId} role="alert" className="text-xs text-error-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);
