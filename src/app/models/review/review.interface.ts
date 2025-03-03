import { Document, Types } from "mongoose";

export interface IReview extends Document {
  student: Types.ObjectId; 
  tutor: Types.ObjectId;
  rating: number;
  comment: string;
  timestamp: Date;
}