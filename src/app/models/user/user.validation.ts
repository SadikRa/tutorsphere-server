import { z } from 'zod';

// Define Zod validation schema for user
export const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  }),
});

// Export validation
export const UserValidation = {
  userValidationSchema,
};
