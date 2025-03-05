import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewControllers } from './review.controller';
import { reviewSchema } from './review.validation';

const router = Router();

// Get all reviews (Public)
router.get('/', ReviewControllers.getAllReview);

// Create a review (Student only)
router.post(
  '/',
  auth(USER_ROLE.student),
  validateRequest(reviewSchema),
  ReviewControllers.createReview,
);

// Delete a review (Student/Admin)
router.delete('/:id', auth(USER_ROLE.student, USER_ROLE.admin), ReviewControllers.deleteReview);

// Update a review (Student only)
router.put(
  '/:id',
  auth(USER_ROLE.student),
  validateRequest(reviewSchema),
  ReviewControllers.updateReview,
);

export const ReviewRoutes = router;
