import { Router } from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = Router();

router.get('/', auth(USER_ROLE.ADMIN), UserController.getAllUser);

router.get(
  '/me',
  auth(USER_ROLE.ADMIN, USER_ROLE.STUDENT),
  UserController.myProfile,
);

router.post('/', UserController.registerUser);
// update profile
router.patch('/update-profile', UserController.updateProfile);

router.patch('/:id/status', UserController.updateUserStatus);

export const UserRoutes = router;
