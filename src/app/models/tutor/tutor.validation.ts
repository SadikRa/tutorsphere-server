import { z } from 'zod';

// Define structured availability
const AvailabilitySchema = z.object({
  day: z.enum([
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]),
});

// Define tutor validation schema
export const TutorValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Name is required')
      .max(50, 'Name must be under 50 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['student', 'tutor', 'admin']),
    bio: z
      .string()
      .min(10, 'Bio must be at least 10 characters long')
      .max(500, 'Bio must be under 500 characters'),
    profilePicture: z.string().url('Invalid profile picture URL').optional(),
    subjects: z
      .array(z.string().min(1))
      .min(1, 'At least one subject is required'),
    hourlyRate: z
      .number()
      .min(5, 'Hourly rate must be at least $5')
      .max(500, 'Hourly rate cannot exceed $500'),
    availability: z
      .array(AvailabilitySchema)
      .min(1, 'At least one availability slot is required'),
    location: z.string(),
  }),
});

// Export validation
export const TutorValidation = {
  TutorValidationSchema,
};
