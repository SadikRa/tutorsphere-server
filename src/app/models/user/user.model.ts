import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "tutor"], required: true },
    bio: { type: String },
    subjects: [{ type: String }], // For tutors
    availability: [{ type: Date }], // For tutors
    ratings: [{ type: Number }], // For tutors
  },
  { timestamps: true }
);

export const UserModel = model<IUser>("User", userSchema);