import express from 'express';
const router = express.Router();
import {
  authUser,
  deleteUser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { protectRoute, isAdmin } from '../middleware/authMiddleWare.js';

router.route('/').post(registerUser).get(protectRoute, isAdmin, getUsers);
router.route('/:id').delete(protectRoute, isAdmin, deleteUser);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protectRoute, getUserProfile)
  .put(protectRoute, updateUserProfile);

export default router;
