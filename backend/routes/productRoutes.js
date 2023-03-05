import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopRatedProducts,
} from '../controllers/productController.js';
import { checkAdmin, protectRoute } from '../middleware/authMiddleWare.js';

router
  .route('/')
  .get(getProducts)
  .post(protectRoute, checkAdmin, createProduct);

router.route('/:id/reviews').post(protectRoute, createProductReview);
router.get('/top', getTopRatedProducts);
router
  .route('/:id')
  .get(getProductById)
  .delete(protectRoute, checkAdmin, deleteProduct)
  .put(protectRoute, checkAdmin, updateProduct);

export default router;
