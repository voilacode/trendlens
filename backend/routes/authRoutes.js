const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // Optional, for role-based access

const router = express.Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// User logout route
router.post('/logout', logoutUser);

// Example of a protected route
// router.get('/protected', authMiddleware(['user']), (req, res) => {
//   res.send('This is a protected route!');
// });

module.exports = router;
