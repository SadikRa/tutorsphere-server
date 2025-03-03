import { z } from "zod";

export const subjectSchema = z.object({
  name: z.string().min(1, { message: "Subject name is required" }),
  gradeLevel: z.string().min(1, { message: "Grade level is required" }),
  category: z.string().min(1, { message: "Category is required" }),
});
