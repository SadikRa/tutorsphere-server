import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TutorServices } from './tutor.service';

const becomingATutor = catchAsync(async (req, res) => {
  const TutorData = req.body;

  const result = await TutorServices.becomingATutor(TutorData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'You are now a tutor',
    data: result,
  });
});

const getTutors = catchAsync(async (req, res) => {
  const users = await TutorServices.getTutors(req?.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Tutor retrieved successfully',
    data: users,
  });
});

export const TutorControllers = {
  becomingATutor,
  getTutors,
};
