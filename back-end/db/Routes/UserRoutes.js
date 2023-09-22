// userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserControllers');
const authenticateToken = require('../../auth/authMiddleware'); // Import the authenticateToken middleware

// Create a new user
router.post('/', userController.createUser);

// Get all users
router.get('/', userController.getAllUsers);

// Get a single user by ID
router.get('/:id', userController.getUserById);

router.get('/email/:email', userController.getUserByEmail);


// Update a user by ID
router.put('/:id', userController.updateUser);

// Delete a user by ID
router.delete('/:id', userController.deleteUser);


router.post('/login', userController.login);

// Example protected route (requires authentication)
router.get('/protected', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'This is a protected route.' });
});


module.exports = router;
