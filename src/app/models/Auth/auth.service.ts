import jwt, { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { UserModel } from '../user/user.model';
import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import config from '../../config';
import { createToken } from './auth.utils';
import bcrypt from 'bcrypt';

export const registerUser = async (user: IUser) => {
  const existingUser = await UserModel.findOne({ email: user.email });

  if (existingUser) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'A user with this email already exists.',
    );
  }

  return await UserModel.create(user);
};

export const loginUser = async (payload: Pick<IUser, 'email' | 'password'>) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Email and password are required',
    );
  }

  const user = await UserModel.isUserExistsByEmail(email);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  if (!(await UserModel.isUserPasswordMatch(password, user.password))) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Invalid password');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
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

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
  registerUser,
};
