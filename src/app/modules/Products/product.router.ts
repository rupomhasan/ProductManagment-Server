import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

router.post('/create-product', productController.createProductIntoDB);

router.get('/', productController.getAllProduct);

router.get('/:productId', productController.getSingleProductById);

router.put('/:productId', productController.updateSingleProduct);

router.delete('/:productId', productController.deleteSingleProduct);

export const ProductRoutes = router;
