import { z } from 'zod';

// Define Zod validation schema for user
export const userValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.enum(['student', 'tutor', 'admin']),
  bio: z.string().optional(),
  subjects: z.array(z.string()).optional(),
  availability: z.array(z.date()).optional(),
  ratings: z.array(z.number().min(0).max(5)).optional(),
});

// Export validation
export const UserValidation = {
  userValidationSchema,
};
