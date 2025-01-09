const db = require('../config/db');
const bcrypt = require('bcryptjs');

// User registration function
const createUser = (username, email, password, role, callback) => {
  const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
  db.query(query, [username, email, password, role], callback);
};

// User login function (fetch by email)
// Example of the `getUserByEmail` function (database query)
const getUserByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], callback); // Assuming you are using mysql or any db library
};


module.exports = { createUser, getUserByEmail };
