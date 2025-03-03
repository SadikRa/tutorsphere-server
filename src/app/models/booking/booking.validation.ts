import { z } from "zod";

export const bookingSchema = z.object({
  student: z.string().refine((val) => /^[a-f\d]{24}$/i.test(val), {
    message: "Invalid student ID",
  }),
  tutor: z.string().refine((val) => /^[a-f\d]{24}$/i.test(val), {
    message: "Invalid tutor ID",
  }),
  dateTime: z.preprocess((val) => new Date(val as string), z.date()),
  duration: z.number().min(1, "Duration must be at least 1 hour"),
  price: z.number().positive("Price must be a positive number"),
  status: z.enum(["pending", "completed", "canceled"]),
});

export type BookingValidation = z.infer<typeof bookingSchema>;
