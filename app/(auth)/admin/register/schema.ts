import z from "zod";

export const adminLoginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type AdminLoginData = z.infer<typeof adminLoginSchema>;

export const adminRegisterSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(50, "Full name must be under 50 characters"),
    email: z
      .string()
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
    profilePicture: z
      .string()
      .url("Please enter a valid image URL")
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type AdminRegisterData = z.infer<typeof adminRegisterSchema>;