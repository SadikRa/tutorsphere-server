import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import { UserSearchableFields } from './user.constant';
import { UserModel } from './user.model';
import AppError from '../../errors/AppError';


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



// const updateProfile = async (authUser: IJwtPayload) => {
//   const isUserExists = await UserModel.findById(authUser.userId);

//   if (!isUserExists) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
//   }

//   const result = await UserModel.findOneAndUpdate(
//     { user: authUser.email },

//     {
//       new: true,
//     },
//   ).populate('user');

//   return result;
// };

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
  getAllUser,
  updateUserStatus,
};
