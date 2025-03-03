import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'tutor'], required: true },
    bio: { type: String },
    subjects: [{ type: String }], 
    availability: [{ type: Date }], 
    ratings: [{ type: Number }], 
  },
  { timestamps: true },
);

export const UserModel = model<IUser>('User', userSchema);
