import jwt, { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import config from '../config';
import { TUserRole } from '../models/users/User.Interface';
import { UserModel } from '../models/users/User.Model';

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'you are UNAUTHORIZED');
    }

    //checking if the token valid

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const {role , email} = decoded; 

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

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'you are not authorized');
    }
    //decoded
    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
