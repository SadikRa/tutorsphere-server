import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { USER_ROLE } from '../users/User.Constant';
import auth from '../../middlewares/auth';
import { AuthValidation } from './Auth.Validation';
import { AuthControllers } from './Auth.Controller';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

export const AuthRouters = router;
