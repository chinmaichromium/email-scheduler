import { z } from "zod";

export const createUserSchema = z
  .object({
    name: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string({ required_error: "Password is required" })
      .min(1, "Password is required")
      .min(8, "Password must have than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });
