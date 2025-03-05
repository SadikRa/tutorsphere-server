import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SubjectServices } from './subject.service';

const createSubject = catchAsync(async (req, res) => {
  const data = req.body;
  const { email } = req.user; // Extract from authenticated user

  const result = await SubjectServices.createSubject(data, email);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Subject created successfully',
    data: result,
  });
});

const getAllSubjects = catchAsync(async (req, res) => {
  const subjects = await SubjectServices.getAllSubjects(req?.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Subjects retrieved successfully',
    data: subjects,
  });
});

const deleteSubject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SubjectServices.deleteSubject(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Subject deleted successfully',
    data: result,
  });
});

const updateSubject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await SubjectServices.updateSubject(id, data);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Subject updated successfully',
    data: result,
  });
});

export const SubjectControllers = {
  createSubject,
  getAllSubjects,
  deleteSubject,
  updateSubject,
};
