import jwt, { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { UserModel } from '../users/User.Model';
import config from '../../config';
import bcrypt from 'bcrypt';
import { TLoginUser } from './Auth.Interface';
import { createToken } from './Auth.Utils';

const loginUser = async (payload: TLoginUser) => {
  // Check if the payload contains the required fields
  if (!payload?.email || !payload?.password) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Email and password are required',
    );
  }

  // Check if the user exists
  const user = await UserModel.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  // Check if the user is deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted');
  }

  // Check if the user is blocked
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked');
  }

  // Check if the password matches
  if (
    !(await UserModel.isUserPasswordMatch(payload?.password, user?.password))
  ) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Invalid password');
  }

  // create token sent

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  // If everything is fine, return a success response or token
  return {
    accessToken,
    refreshToken,
  };
};

//change password
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // Use `userData.email` instead of `payload.email`
  const user = await UserModel.isUserExistsByEmail(userData.email);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  // Check if the user is deleted
  if (user?.isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted');
  }

  // Check if the user is blocked
  if (user?.isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked');
  }

  // Check if the old password is correct
  if (
    !(await UserModel.isUserPasswordMatch(payload.oldPassword, user?.password))
  ) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password does not match');
  }

  // Hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await UserModel.findOneAndUpdate(
    { email: userData.email, role: userData.role },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

///refreshToken
const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'you are UNAUTHORIZED');
  }

  //checking if the token valid

  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { email } = decoded;

  // Check if the user exists
  const user = await UserModel.isUserExistsByEmail(email);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  // Check if the user is deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted');
  }

  // Check if the user is blocked
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked');
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
};
