import { StatusCodes } from 'http-status-codes';
import { TUser } from './User.Interface';
import { UserModel } from './User.Model';
import AppError from '../../errors/AppError';
import { userSearchableFields } from './User.Constant';
import QueryBuilder from '../../builder/QueryBuilder';

const createUserIntoDB = async (user: TUser) => {
  // Check if user already exists
  const existingUser = await UserModel.findOne({ email: user.email });

  if (existingUser) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'A user with this email already exists.',
    );
  }

  // Create and return the new user
  return await UserModel.create(user);
};

const getAllUsers = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(UserModel.find({ role: 'user' }), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();
  return { result, meta };
};

const getASingleUser = async (email: string) => {
  const result = UserModel.findOne({ email });
  return result;
};

export const UserService = { createUserIntoDB, getAllUsers, getASingleUser };
