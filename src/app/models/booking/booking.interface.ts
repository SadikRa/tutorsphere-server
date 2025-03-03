import { Document, Types } from "mongoose";

export interface IBooking extends Document {
  student: Types.ObjectId; 
  tutor: Types.ObjectId; 
  dateTime: Date;
  duration: number; // In hours
  price: number;
  status: "pending" | "completed" | "canceled";
}