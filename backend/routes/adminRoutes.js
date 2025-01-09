const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Example protected admin route
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: 'Welcome Admin', user: req.user });
});

module.exports = router;
