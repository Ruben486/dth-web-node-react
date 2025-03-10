import express from "express";
import
 { updateUser,
    getAllUsers, 
    getUser,
    deleteUser }
 from "../controllers/userController.js";
import {verifyTokenAndAdmin} from "../controllers/verifyToken.js";

const router = express.Router();

// Controller functions (you need to implement these)

// GET route to fetch all users
router.get('/', getAllUsers);

router.get('/:id', getUser);
// DELETE route to delete a user
router.delete("/:id", verifyTokenAndAdmin, deleteUser);

// PUT route to update a user
router.put('/:id', verifyTokenAndAdmin,updateUser);

// POST route to create a new user
//router.post('/users', createUser);

export default router;