import express from 'express';
import orderController from '../controllers/orders.js';

const router = express.Router();

router.get('/', orderController.getAll);
router.post('/', orderController.create);
router.put('/:id', orderController.update);
router.delete('/:id', orderController.delete);

export default router;