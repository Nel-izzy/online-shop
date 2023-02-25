import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { protectRoute } from '../middleware/authMiddleWare.js';

router.route('/').post(protectRoute, addOrderItems);
router.route('/myorders').get(protectRoute, getMyOrders);
router.route('/:id').get(protectRoute, getOrderById);

router.route('/:id/pay').put(protectRoute, updateOrderToPaid);

export default router;
