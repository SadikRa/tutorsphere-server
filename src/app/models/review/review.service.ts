import { ReviewModel } from "../models/review.model";
import { IReview } from "../interfaces/review.interface";

export const createReview = async (reviewData: IReview) => {
  const review = new ReviewModel(reviewData);
  return review.save();
};

export const getReviews = async (filters: any) => {
  return ReviewModel.find(filters).populate("student tutor");
};