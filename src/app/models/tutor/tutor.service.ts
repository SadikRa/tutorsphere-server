import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import { UserModel } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { UserSearchableFields } from '../user/user.constant';
import mongoose from 'mongoose';

//becoming A Tutor

export const becomingATutor = async (tutorData: Partial<IUser>) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const email = tutorData?.email;

  try {
    // Find user by email
    const user = await UserModel.findOne({ email }).session(session);

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
    }

    if (user.role === 'tutor') {
      throw new AppError(StatusCodes.BAD_REQUEST, 'User is already a tutor');
    }

    // Ensure required tutor fields are provided
    if (!tutorData.bio || !tutorData.subjects || !tutorData.availability) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Missing required tutor details',
      );
    }

    // Update the user role and add tutor details
    Object.assign(user, {
      role: 'tutor',
      bio: tutorData.bio,
      subjects: tutorData.subjects,
      availability: tutorData.availability,
      hourlyRate: tutorData.hourlyRate || 10,
    });

    await user.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return user;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

///get all tutor
const getTutors = async (query: Record<string, unknown>) => {
  const UserQuery = new QueryBuilder(UserModel.find({ role: 'tutor' }), query)
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

export const TutorServices = {
  becomingATutor,
  getTutors,
};
