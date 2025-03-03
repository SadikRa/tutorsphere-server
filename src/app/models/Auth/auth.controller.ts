import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';
import config from '../../config';

const registerUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await AuthService.registerUser(userData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User registration completed successfully!',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);

  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User login successful',
    data: {
      accessToken,
    },
  });
});

const refreshToken = catchAsync(async () => {
  // Implement refresh token logic here
});

const changePassword = catchAsync(async () => {
  // Implement change password logic here
});

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
  registerUser,
};
