import { IUser } from './user.interface';
import AppError from '../../errors/appError';
import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import { UserSearchableFields } from './user.constant';
import mongoose from 'mongoose';
import { UserModel } from './user.model';

// Function to register user
const registerUser = async (userData: IUser) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  //  if ([USER_ROLE.ADMIN].includes(userData.role)) {
  //    throw new AppError(
  //      StatusCodes.NOT_ACCEPTABLE,
  //      'Invalid role. Only User is allowed.',
  //    );
  //  }

  // Check if the user already exists by email
  const existingUser = await UserModel.findOne({
    email: userData.email,
  }).session(session);
  if (existingUser) {
    throw new AppError(
      StatusCodes.NOT_ACCEPTABLE,
      'Email is already registered',
    );
  }
};
// Create the user

const getAllUser = async (query: Record<string, unknown>) => {
  const UserQuery = new QueryBuilder(UserModel.find(), query)
    .search(UserSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await UserQuery.modelQuery;
  const meta = await UserQuery.countTotal();
  return {
    result,
    meta,
  };
};

const myProfile = async (authUser: IJwtPayload) => {
  const isUserExists = await UserModel.findById(authUser.userId);
  if (!isUserExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
  }

  const profile = await UserModel.findOne({ user: isUserExists._id });

  return {
    ...isUserExists.toObject(),
    profile: profile || null,
  };
};

const updateProfile = async (authUser: IJwtPayload) => {
  const isUserExists = await UserModel.findById(authUser.userId);

  if (!isUserExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
  }

  const result = await UserModel.findOneAndUpdate(
    { user: authUser.email },

    {
      new: true,
    },
  ).populate('user');

  return result;
};

const updateUserStatus = async (userId: string) => {
  const user = await UserModel.findById(userId);

  console.log('comes here');
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not found');
  }

  const updatedUser = await user.save();
  return updatedUser;
};

export const UserServices = {
  registerUser,
  getAllUser,
  myProfile,
  updateUserStatus,
  updateProfile,
};
