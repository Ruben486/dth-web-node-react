import express from "express";
import checkUserId from "../controllers/verifyUser.js";
import favoritesControllers from "../controllers/favoritoController.js";

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

export default router;