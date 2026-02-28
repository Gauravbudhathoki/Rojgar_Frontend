import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const JobSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Job title must be at least 3 characters" })
    .max(100, { message: "Job title must be under 100 characters" }),

  type: z.enum(["full-time", "part-time"], {
    message: "Type must be full-time or part-time",
  }),

  category: z.enum(["technology", "finance", "healthcare", "education", "hospitality", "other"], {
    message: "Please select a valid job category",
  }),

  company: z
    .string()
    .min(1, { message: "Company name is required" })
    .max(100, { message: "Company name must be under 100 characters" }),

  location: z
    .string()
    .min(1, { message: "Location is required" }),

  deadline: z
    .string()
    .min(1, { message: "Application deadline is required" })
    .refine((val) => new Date(val) >= new Date(new Date().toDateString()), {
      message: "Deadline must be today or a future date",
    }),

  salary: z.string().optional(),

  vacancies: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 1), {
      message: "Vacancies must be a number of at least 1",
    }),

  description: z.string().optional(),

  bannerImage: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: "Max file size is 5MB",
    })
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png, .webp formats are supported",
    }),
});

export type JobData = z.infer<typeof JobSchema>;