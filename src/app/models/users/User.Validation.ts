import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().nonempty({ message: 'Name is required.' }),
    email: z
      .string()
      .email({ message: 'Please provide a valid email address' })
      .nonempty({ message: 'Email cannot be empty' }),
      password: z.string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
    role: z.enum(['user', 'admin']).default('user').optional(),
    isBlocked: z.boolean().default(false).optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
