const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createUser, getUserByEmail } = require('../models/User');
const nodemailer = require('nodemailer');
// Initialize nodemailer transporter (for SMTP email)
const transporter = nodemailer.createTransport({
  service: 'gmail', // or other service you prefer
  auth: {
      user: process.env.FROM_EMAIL, // Your Gmail address
      pass: process.env.GMAIL_APP_PASSWORD, // Your app password
  },
});

// Function to send welcome email
const sendWelcomeEmail = async (recipientEmail, userName) => {
  const mailOptions = {
      from: process.env.FROM_EMAIL, // Your sending email
      to: recipientEmail,            // Recipient's email
      subject: 'Welcome to DocuScan!',
      text: `Hi ${userName},\n\nThank you for registering with TrendLens! We’re excited to have you onboard.\n\nBest regards,\nThe Trendlens Team`,
  };

  try {
      // Send email using nodemailer
      await transporter.sendMail(mailOptions);
      console.log('Welcome email sent successfully');
  } catch (error) {
      console.error('Error sending welcome email:', error);
  }
};
// Register a new user
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    getUserByEmail(email, async (err, result) => {
      if (err) return res.status(500).json({ message: 'Database error' });

      if (result.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      await sendWelcomeEmail(email, username); // Call the function to send email

      // Create the user
      createUser(username, email, hashedPassword, 'user', (err, result) => {
        if (err) return res.status(500).json({ message: 'Error creating user' });
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch user by email
    getUserByEmail(email, async (err, result) => {
      if (err) return res.status(500).json({ message: 'Database error' });

      if (result.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = result[0];

      // Compare the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '1h' }
      );

      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username, 
          role: user.role
        }
      });
      
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Logout user (just remove the token on the frontend)
const logoutUser = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { registerUser, loginUser, logoutUser };
