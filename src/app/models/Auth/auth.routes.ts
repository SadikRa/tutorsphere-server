import { Router } from 'express';
import { AuthController } from './auth.controller';

const router = Router();

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);

router.post(
  '/refresh-token',
  // validateRequest(AuthValidation.refreshTokenZodSchema),
);

router.post('/change-password');

export const AuthRoutes = router;
