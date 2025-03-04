import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUser(req?.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: users,
  });
});

const getASingleUser = catchAsync(async (req, res) => {
  const { email } = req.params;

  const result = await UserServices.getASingleUser(email);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

export const UserControllers = {
  getAllUsers,
  getASingleUser,
};
