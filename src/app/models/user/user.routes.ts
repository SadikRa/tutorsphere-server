import { Router } from 'express';
import auth from '../../middlewares/auth';
import { UserControllers } from './user.controller';
import { USER_ROLE } from './user.constant';

const router = Router();

router.get('/', auth(USER_ROLE.admin), UserControllers.getAllUsers);

router.get(
  '/:email',
  auth(USER_ROLE.student, USER_ROLE.tutor, USER_ROLE.admin),
  UserControllers.getASingleUser,
);

export const UserRoutes = router;
