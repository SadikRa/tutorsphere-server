import QueryBuilder from '../../builder/QueryBuilder';
import { UserSearchableFields } from './user.constant';
import { UserModel } from './user.model';

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

const getASingleUser = async (email: string) => {
  const result = UserModel.findOne({ email });
  return result;
};

export const UserServices = {
  getAllUser,
  getASingleUser,
};
