import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { SubjectControllers } from './subject.controller';
import validateRequest from '../../middlewares/validateRequest';
import { subjectSchema } from './subject.validation';

const router = Router();

// Get all subjects (Public)
router.get('/', SubjectControllers.getAllSubjects);

// Create a subject (Admin only)
router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(subjectSchema),
  SubjectControllers.createSubject,
);

// Delete a subject (Admin only)
router.delete('/:id', auth(USER_ROLE.admin), SubjectControllers.deleteSubject);

// Update a subject (Admin only)
router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(subjectSchema),
  SubjectControllers.updateSubject,
);

export const SubjectRoutes = router;
