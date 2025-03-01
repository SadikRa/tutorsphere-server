import { Document, Types } from "mongoose";

export interface IReview extends Document {
  student: Types.ObjectId; // Reference to User (student)
  tutor: Types.ObjectId; // Reference to User (tutor)
  rating: number;
  comment: string;
  timestamp: Date;
}