const express = require('express');
const { updateUser,getAllUsers, getUser,deleteUser } = require('../controllers/userController');
const {verifyTokenAndAdmin} = require("../controllers/verifyToken")

const router = express.Router();

// Controller functions (you need to implement these)

// GET route to fetch all users
router.get('/', verifyTokenAndAdmin, getAllUsers);

router.get('/:id', getUser);
// DELETE route to delete a user
router.delete('/:id', deleteUser);

// PUT route to update a user
router.put('/:id', updateUser);

// POST route to create a new user
//router.post('/users', createUser);

module.exports = router;