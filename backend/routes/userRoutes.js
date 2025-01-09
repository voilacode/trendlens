const express = require('express');
const { getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');

const router = express.Router();

// Get all users (Admin-only)
router.get('/', authMiddleware(['admin']), getAllUsers);

// Get a single user by ID
router.get('/:id', authMiddleware(['admin', 'user']), getUser);

// Update a user
router.put('/:id', authMiddleware(['admin', 'user']), updateUser);

// Delete a user (Admin-only)
router.delete('/:id', authMiddleware(['admin']), deleteUser);


// Route to get the logged-in user's profile
router.get('/profile', authMiddleware(), getUserProfile);  // Only authenticated users can access their profile

// Route to update the logged-in user's profile
router.put('/profile', authMiddleware(), updateUserProfile);  // Only authenticated users can update their profile

module.exports = router;
