import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label}
            {props.required && <span className="text-error-400 ml-0.5">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`w-full rounded border px-3 py-2 text-sm outline-none transition-colors focus:border-secondary focus:ring-1 focus:ring-secondary ${
            error ? "border-error-400" : "border-gray-300"
          } ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-error-400">{error}</p>}
      </div>
    );
  }
);
