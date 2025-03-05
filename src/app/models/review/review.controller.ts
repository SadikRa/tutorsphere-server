import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReviewServices } from './review.service';

//  Create Review
const createReview = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await ReviewServices.createReview(data);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Review created successfully',
    data: result,
  });
});

//  Get All Reviews

const getAllReview = catchAsync(async (req, res) => {
  const reviews = await ReviewServices.getAllReview(req?.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Reviews retrieved successfully',
    data: reviews,
  });
});

// Delete Review

const deleteReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewServices.deleteReview(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review deleted successfully',
    data: result,
  });
});

//  Update Review
const updateReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await ReviewServices.updateReview(id, data);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review updated successfully',
    data: result,
  });
});

export const ReviewControllers = {
  createReview,
  getAllReview,
  deleteReview,
  updateReview,
};
