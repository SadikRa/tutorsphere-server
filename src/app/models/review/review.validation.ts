import { z } from "zod";
import mongoose from "mongoose";

export const reviewSchema = z.object({
  student: z
    .string()
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid student ObjectId",
    }),
  tutor: z
    .string()
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid tutor ObjectId",
    }),
  rating: z
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating cannot be more than 5" }),
  comment: z.string().min(1, { message: "Comment cannot be empty" }),
  timestamp: z.date().optional(),
});
