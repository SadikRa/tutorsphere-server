import { Router } from 'express';
import { TutorControllers } from './tutor.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { TutorValidation } from './tutor.validation';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.student),
  validateRequest(TutorValidation.TutorValidationSchema),
  TutorControllers.becomingATutor,
);

router.get('/', TutorControllers.getTutors);

export const TutorRoutes = router;
