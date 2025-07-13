import express from 'express';
import {getAllOrders,getOrderById,createOrder,updateOrder,deleteOrder}
 from '../controllers/orderControllers.js';

 const router = express.Router();
// Create order
router.post('/', createOrder);

// Get all orders
router.get('/', getAllOrders);

// Get order by ID
router.get('/:id',getOrderById);

// Update order
router.put('/:id', updateOrder);

// Delete order
router.delete('/:id', deleteOrder);

export default router;
