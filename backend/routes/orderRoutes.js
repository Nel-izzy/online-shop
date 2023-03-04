import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { checkAdmin, protectRoute } from '../middleware/authMiddleWare.js';

router
  .route('/')
  .post(protectRoute, addOrderItems)
  .get(protectRoute, checkAdmin, getOrders);
router.route('/myorders').get(protectRoute, getMyOrders);
router.route('/:id').get(protectRoute, getOrderById);

router.route('/:id/pay').put(protectRoute, updateOrderToPaid);
router
  .route('/:id/deliver')
  .put(protectRoute, checkAdmin, updateOrderToDelivered);

export default router;
