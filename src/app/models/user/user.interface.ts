/* eslint-disable no-unused-vars */
import { Document, Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'tutor' | 'admin';
  profilePicture: string;
  bio?: string;
  subjects?: string[];
  availability?: Date[];
  hourlyRate: number;
  ratings?: number[];
  totalReviews: number;
  location: string;
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

export type TUserRole = keyof typeof USER_ROLE;
