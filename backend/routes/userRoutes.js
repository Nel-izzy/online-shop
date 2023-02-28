import express from 'express';
const router = express.Router();
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { protectRoute, checkAdmin } from '../middleware/authMiddleWare.js';

router.route('/').post(registerUser).get(protectRoute, checkAdmin, getUsers);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protectRoute, getUserProfile)
  .put(protectRoute, updateUserProfile);
router
  .route('/:id')
  .delete(protectRoute, checkAdmin, deleteUser)
  .get(protectRoute, checkAdmin, getUserById)
  .put(protectRoute, checkAdmin, updateUser);

export default router;
