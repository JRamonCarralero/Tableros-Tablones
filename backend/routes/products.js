import express from 'express';
import productController from '../controllers/products.js';

const router = express.Router();

router.get('/', productController.getAll);
router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);
router.get('/filters', productController.getFilteredProducts);

export default router;