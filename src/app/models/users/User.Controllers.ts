import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './User.Services';

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;

  const result = await UserService.createUserIntoDB(userData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserService.getAllUsers(req?.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: users,
  });
});

const getASingleUser = catchAsync(async (req, res) => {
  const { email } = req.params;

  const result = await UserService.getASingleUser(email);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUsers,
  getASingleUser,
};
