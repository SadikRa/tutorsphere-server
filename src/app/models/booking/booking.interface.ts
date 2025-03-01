import { Document, Types } from "mongoose";

export interface IBooking extends Document {
  student: Types.ObjectId; // Reference to User (student)
  tutor: Types.ObjectId; // Reference to User (tutor)
  dateTime: Date;
  duration: number; // In hours
  price: number;
  status: "pending" | "completed" | "canceled";
}