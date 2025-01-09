const db = require('../config/db');

// Get all users
const getAllUsers = (req, res) => {
  db.query('SELECT id, username, email, role FROM users', (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.status(200).json(results);
  });
};

// Get a single user
const getUser = (req, res) => {
  const userId = req.params.id;
  db.query('SELECT id, username, email, role FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(results[0]);
  });
};

// Update a user
const updateUser = (req, res) => {
  const userId = req.params.id;
  const { username, email, role } = req.body;

  db.query(
    'UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?',
    [username, email, role, userId],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
      res.status(200).json({ message: 'User updated successfully' });
    }
  );
};

// Delete a user
const deleteUser = (req, res) => {
  const userId = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  });
};
// Get the profile of the logged-in user
const getUserProfile = (req, res) => {
  const userId = req.user.id;  // The ID of the logged-in user from the JWT token
  
  db.query('SELECT id, username, email, role FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(results[0]); // Send the user profile data
  });
};

// Update the profile of the logged-in user
const updateUserProfile = (req, res) => {
  const userId = req.user.id;  // The ID of the logged-in user from the JWT token
  const { username, email } = req.body;  // Only allow updating username and email

  db.query(
    'UPDATE users SET username = ?, email = ? WHERE id = ?',
    [username, email, userId],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
      res.status(200).json({ message: 'User profile updated successfully' });
    }
  );
};



module.exports = { getAllUsers, getUser, updateUser, deleteUser ,getUserProfile, updateUserProfile};
