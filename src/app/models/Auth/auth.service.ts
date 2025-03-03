import { StatusCodes } from 'http-status-codes';
import { UserModel } from '../user/user.model';
import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import config from '../../config';
import { createToken } from './auth.utils';

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

export const refreshToken = async () => {
  // Implement refresh token logic here
};

export const changePassword = async () => {
  // Implement change password logic here
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
  registerUser,
};
