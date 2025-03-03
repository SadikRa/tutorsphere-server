import { Document } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'tutor' | 'admin';
  bio?: string;
  subjects?: string[];
  availability?: Date[];
  ratings?: number[];
}

export type UserRole = keyof typeof USER_ROLE;
