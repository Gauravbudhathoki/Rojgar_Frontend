import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const UserSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters" })
      .max(30, { message: "Username must be under 30 characters" })
      .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" }),
    email: z
      .string()
      .email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
    profilePicture: z
      .instanceof(File)
      .optional()
      .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
        message: "Max file size is 5MB",
      })
      .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "Only .jpg, .jpeg, .png, .webp formats are supported",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type UserData = z.infer<typeof UserSchema>;

export const UserEditSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters" })
      .max(30, { message: "Username must be under 30 characters" })
      .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" })
      .optional(),
    email: z
      .string()
      .email({ message: "Please enter a valid email address" })
      .optional(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .optional()
      .or(z.literal("")),
    confirmPassword: z
      .string()
      .optional()
      .or(z.literal("")),
    profilePicture: z
      .instanceof(File)
      .optional()
      .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
        message: "Max file size is 5MB",
      })
      .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "Only .jpg, .jpeg, .png, .webp formats are supported",
      }),
  })
  .refine(
    (data) => {
      if (data.password || data.confirmPassword) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }
  );

export type UserEditData = z.infer<typeof UserEditSchema>;