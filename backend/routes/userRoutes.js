import express from "express";
const router = express.Router();
import { authUser, getUserProfile, registerUser, updateUserProfile } from "../controllers/userController.js";
import { protectRoute } from "../middleware/authMiddleWare.js";

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protectRoute, getUserProfile).put(protectRoute, updateUserProfile)



export default router;