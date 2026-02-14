import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

export const registerSchema = z
  .object({
    username: z.string().min(2, "Username required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Minimum 6 characters"),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });