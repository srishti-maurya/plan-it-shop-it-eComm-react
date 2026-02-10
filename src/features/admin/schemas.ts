import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  categoryName: z.enum([
    "contemporary-fiction",
    "self-help",
    "biographies-autobiographies",
    "spirituality",
    "mythology",
  ], { message: "Category is required" }),
  price: z.string().min(1, "Price is required"),
  prevPrice: z.string().min(1, "Previous price is required"),
  discount: z.string().min(1, "Discount is required"),
  rating: z.string().min(1, "Rating is required"),
  bestseller: z.boolean(),
  newRelease: z.boolean(),
  expertPick: z.boolean(),
  image: z.string().min(1, "Cover image is required"),
});

export type BookFormData = z.infer<typeof bookSchema>;
