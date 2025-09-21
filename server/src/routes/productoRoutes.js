import express from "express";
import { verifyTokenAndAdmin } from "../user/controllers/verifyToken.js";
import {
    getProductoById,
    addProducto,
    updateProducto,
    deleteProducto,
    getAllProducts
} from "../controllers/productoController.js";

const router = express.Router();


// Create a new product
router.post('/', addProducto);

// Get a single product by ID
router.get('/:id', verifyTokenAndAdmin, getProductoById);

// Update a product by ID
router.put('/:id', verifyTokenAndAdmin, updateProducto);

// Delete a product by ID
router.delete('/:id', verifyTokenAndAdmin, deleteProducto);

// Get all products
router.get('/', getAllProducts);

export default router;