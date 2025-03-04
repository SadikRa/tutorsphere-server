import { Router } from 'express';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { UserValidation } from '../user/user.validation';

const router = Router();

router.post(
  '/register',
  validateRequest(UserValidation.userValidationSchema),
  AuthController.registerUser,
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser,
);

router.post(
  '/change-password',
  auth(USER_ROLE.ADMIN, USER_ROLE.STUDENT),
  validateRequest(AuthValidation.changePasswordZodSchema),
  AuthController.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken,
);

export const AuthRoutes = router;
