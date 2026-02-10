import { useCallback, useRef, useState } from "react";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";

interface CoverUploadProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function CoverUpload({ value, onChange, error }: CoverUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          onChange(result);
        }
      };
      reader.readAsDataURL(file);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700 dark:text-slate-200">
        Cover Image<span className="text-error-400 ml-0.5" aria-hidden="true">*</span>
      </label>

      {value ? (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Cover preview"
            className="h-40 w-28 rounded border object-cover dark:border-slate-600"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
          >
            <FaTrash className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={handleKeyDown}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
            isDragging
              ? "border-secondary bg-secondary/5"
              : error
              ? "border-error-400"
              : "border-gray-300 hover:border-gray-400 dark:border-slate-600 dark:hover:border-slate-500"
          }`}
        >
          <FaCloudUploadAlt className="mb-2 h-8 w-8 text-gray-400 dark:text-slate-500" />
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Drag & drop or click to upload
          </p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {error && <p className="text-xs text-error-400">{error}</p>}
    </div>
  );
}
