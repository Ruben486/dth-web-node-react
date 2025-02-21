const express = require('express');
const categoriaController = require('../controllers/categoriaController');

const router = express.Router();

// Obtener todas las categorías
router.get('/', categoriaController.getCategorias);

router.get('/frecuentes', categoriaController.getCategoriasFrecuentes);

// Obtener una categoría por ID
router.get('/:id', categoriaController.getCategoriaById);

// Crear una nueva categoría
router.post('/', categoriaController.createCategoria);

// Actualizar una categoría por ID
router.put('/:id', categoriaController.updateCategoria);

// Eliminar una categoría por ID
router.delete('/:id', categoriaController.deleteCategoria);

module.exports = router;