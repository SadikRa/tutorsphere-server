import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { ISubject } from './subject.interface';
import { SubjectModel } from './subject.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createSubject = async (subject: ISubject, email: string) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User not found');
  }

  if (user.role !== 'admin') {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'Only admins can create subjects',
    );
  }

  const result = await SubjectModel.create(subject);
  return result;
};

const getAllSubjects = async (query: Record<string, unknown>) => {
  const subjectQuery = new QueryBuilder(SubjectModel.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await subjectQuery.modelQuery;
  const meta = await subjectQuery.countTotal();

  return { result, meta };
};

const deleteSubject = async (id: string) => {
  const subject = await SubjectModel.findByIdAndDelete(id);

  if (!subject) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Subject not found');
  }

  return subject;
};

const updateSubject = async (id: string, data: Partial<ISubject>) => {
  const updatedSubject = await SubjectModel.findByIdAndUpdate(id, data, {
    new: true,
  });

  if (!updatedSubject) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Subject not found');
  }

  return updatedSubject;
};

export const SubjectServices = {
  createSubject,
  getAllSubjects,
  deleteSubject,
  updateSubject,
};
