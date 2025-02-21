const express = require('express');
const Favorito = require('../modelos/Favorito');
const checkUserId = require('../controllers/verifyUser');
const favoritesControllers = require('../controllers/favoritoController');

const router = express.Router();

// Get all favoritos for a user
router.get('/', checkUserId, favoritesControllers.getAllFavoritosUser);

// Create a new favorito
router.post('/', checkUserId, favoritesControllers.addFavorito);

// Update a favorito
router.put('/:id', checkUserId, favoritesControllers.updateFavorito
);

// Delete a favorito
router.delete('/:id', checkUserId, favoritesControllers.deleteFavorito);

module.exports = router;