/* eslint-disable no-unused-vars */
import { Document, Model } from 'mongoose';
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
  isDeleted?: boolean;
  isBlocked?: boolean;
}

export interface UserModelInterface extends Model<IUser> {
  isUserExistsByEmail(email: string): Promise<IUser | null>;
  isUserPasswordMatch(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type UserRole = keyof typeof USER_ROLE;
