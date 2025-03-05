import { z } from "zod";

export const subjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Subject name must be at least 2 characters long" })
    .max(100, { message: "Subject name cannot exceed 100 characters" }),
  
  gradeLevel: z.enum(["Primary", "Middle", "High School", "College", "University"], {
    message: "Invalid grade level",
  }),

  category: z.enum(
    ["Mathematics", "Science", "Languages", "Arts", "Technology", "Business", "Programming", "Other"],
    { message: "Invalid category" }
  ),
});
