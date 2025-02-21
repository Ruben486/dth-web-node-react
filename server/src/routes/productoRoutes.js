const express = require('express');
const router = express.Router();
const { verifyTokenAndAdmin } = require('../controllers/verifyToken');
const {
    addProducto,
    getProductoById,
    updateProducto,
    deleteProducto,
    getAllProductos
} = require('../controllers/productoController');


// Create a new product
router.post('/', addProducto);

// Get a single product by ID
router.get('/:id', verifyTokenAndAdmin, getProductoById);

// Update a product by ID
router.put('/:id', verifyTokenAndAdmin, updateProducto);

// Delete a product by ID
router.delete('/:id', verifyTokenAndAdmin, deleteProducto);

// Get all products
router.get('/', getAllProductos);

module.exports = router;