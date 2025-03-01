import { Schema, model } from "mongoose";
import { IReview } from "../interfaces/review.interface";

const reviewSchema = new Schema<IReview>(
  {
    student: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tutor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const ReviewModel = model<IReview>("Review", reviewSchema);