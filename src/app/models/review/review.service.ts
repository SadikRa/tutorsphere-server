/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { IReview } from './review.interface';
import { ReviewModel } from './review.model';
import { UserModel } from '../user/user.model';

//  Create a review

export const createReview = async (reviewData: IReview) => {
  const { student, tutor, rating, comment } = reviewData;

  const studentExists = await UserModel.findById(student);
  if (!studentExists || studentExists.role !== 'student') {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid student ID');
  }

  const tutorExists = await UserModel.findById(tutor);
  if (!tutorExists || tutorExists.role !== 'tutor') {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid tutor ID');
  }

  const review = await ReviewModel.create({ student, tutor, rating, comment });

  tutorExists.ratings = tutorExists.ratings || [];
  tutorExists.ratings.push(rating);
  tutorExists.totalReviews = (tutorExists.totalReviews || 0) + 1;

  await tutorExists.save();

  return review;
};

//  Get all reviews with optional filters
export const getAllReview = async (filters: any) => {
  return ReviewModel.find(filters).populate('student tutor');
};

//  Delete a review
export const deleteReview = async (id: string) => {
  const review = await ReviewModel.findByIdAndDelete(id);

  if (!review) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Review not found');
  }

  const tutor = await UserModel.findById(review.tutor);
  if (tutor) {
    tutor.ratings = tutor.ratings?.filter((r) => r !== review.rating);
    tutor.totalReviews = Math.max(0, tutor.totalReviews - 1);
    await tutor.save();
  }

  return review;
};

//  Update a review
export const updateReview = async (id: string, data: Partial<IReview>) => {
  const review = await ReviewModel.findById(id);

  if (!review) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Review not found');
  }

  const oldRating = review.rating;

  Object.assign(review, data);
  await review.save();

  if (data.rating !== undefined) {
    const tutor = await UserModel.findById(review.tutor);
    if (tutor) {
      tutor.ratings = tutor.ratings?.map((r) =>
        r === oldRating ? data.rating! : r,
      );
      await tutor.save();
    }
  }

  return review;
};

export const ReviewServices = {
  createReview,
  getAllReview,
  deleteReview,
  updateReview,
};
