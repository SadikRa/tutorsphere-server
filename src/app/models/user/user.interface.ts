import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "student" | "tutor";
  bio?: string;
  subjects?: string[]; // For tutors
  availability?: Date[]; // For tutors
  ratings?: number[]; // For tutors
}