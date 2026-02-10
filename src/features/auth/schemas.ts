import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    fullname: z.string().min(1, "Full name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    cnfpassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.cnfpassword, {
    message: "Passwords don't match",
    path: ["cnfpassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
