import { Router } from 'express';
import { AuthRoutes } from '../models/auth/auth.routes';
import { UserRoutes } from '../models/user/user.routes';
import { TutorRoutes } from '../models/tutor/tutor.route';
import { SubjectRoutes } from '../models/subject/subject.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/tutor',
    route: TutorRoutes,
  },
  {
    path: '/subject',
    route: SubjectRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
