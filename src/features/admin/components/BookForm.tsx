import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "@/shared/ui";
import { bookSchema, type BookFormData } from "../schemas";
import { CoverUpload } from "./CoverUpload";
import type { Product } from "@/types";

interface BookFormProps {
  product?: Product;
  onSubmit: (data: BookFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const categories = [
  { value: "contemporary-fiction", label: "Contemporary Fiction" },
  { value: "self-help", label: "Self Help" },
  { value: "biographies-autobiographies", label: "Biographies & Autobiographies" },
  { value: "spirituality", label: "Spirituality" },
  { value: "mythology", label: "Mythology" },
] as const;

export function BookForm({ product, onSubmit, onCancel, isSubmitting }: BookFormProps) {
  const isEditing = Boolean(product);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: product
      ? {
          title: product.title,
          author: product.author,
          categoryName: product.categoryName,
          price: product.price,
          prevPrice: product.prevPrice,
          discount: product.discount,
          rating: product.rating,
          bestseller: product.bestseller,
          newRelease: product.newRelease,
          expertPick: product.expertPick,
          image: product.image,
        }
      : {
          title: "",
          author: "",
          categoryName: "contemporary-fiction",
          price: "",
          prevPrice: "",
          discount: "",
          rating: "",
          bestseller: false,
          newRelease: false,
          expertPick: false,
          image: "",
        },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
    >
      <h3 className="mb-4 text-lg font-semibold dark:text-slate-100">
        {isEditing ? "Edit Book" : "Add New Book"}
      </h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Title"
          id="title"
          required
          error={errors.title?.message}
          {...register("title")}
        />
        <Input
          label="Author"
          id="author"
          required
          error={errors.author?.message}
          {...register("author")}
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="categoryName" className="text-sm font-medium text-gray-700 dark:text-slate-200">
            Category<span className="text-error-400 ml-0.5" aria-hidden="true">*</span>
          </label>
          <select
            id="categoryName"
            className={`w-full rounded border px-3 py-2 text-sm outline-none transition-colors focus:border-secondary focus:ring-1 focus:ring-secondary dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 ${
              errors.categoryName ? "border-error-400" : "border-gray-300"
            }`}
            {...register("categoryName")}
          >
            {categories.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {errors.categoryName && (
            <p className="text-xs text-error-400">{errors.categoryName.message}</p>
          )}
        </div>

        <Input
          label="Price"
          id="price"
          required
          error={errors.price?.message}
          {...register("price")}
        />
        <Input
          label="Previous Price"
          id="prevPrice"
          required
          error={errors.prevPrice?.message}
          {...register("prevPrice")}
        />
        <Input
          label="Discount"
          id="discount"
          required
          placeholder="e.g. 10%"
          error={errors.discount?.message}
          {...register("discount")}
        />
        <Input
          label="Rating"
          id="rating"
          required
          placeholder="e.g. 4.5"
          error={errors.rating?.message}
          {...register("rating")}
        />

        <div className="flex flex-col gap-3 sm:col-span-2">
          <span className="text-sm font-medium text-gray-700 dark:text-slate-200">Collections</span>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary dark:border-slate-600"
                {...register("bestseller")}
              />
              <span className="text-sm text-gray-700 dark:text-slate-300">Bestseller</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary dark:border-slate-600"
                {...register("newRelease")}
              />
              <span className="text-sm text-gray-700 dark:text-slate-300">New Release</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary dark:border-slate-600"
                {...register("expertPick")}
              />
              <span className="text-sm text-gray-700 dark:text-slate-300">Expert Pick</span>
            </label>
          </div>
        </div>

        <div className="sm:col-span-2">
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <CoverUpload
                value={field.value}
                onChange={field.onChange}
                error={errors.image?.message}
              />
            )}
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isEditing ? "Update Book" : "Add Book"}
        </Button>
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
