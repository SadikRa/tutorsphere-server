import { Schema, model } from "mongoose";
import { IBooking } from "./booking.interface";

const bookingSchema = new Schema<IBooking>(
  {
    student: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tutor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    dateTime: { type: Date, required: true },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "canceled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const BookingModel = model<IBooking>("Booking", bookingSchema);