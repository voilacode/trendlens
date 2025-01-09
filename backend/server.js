const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const socialMediaRoutes = require('./routes/socialMediaRoutes');
const sentimentRoutes = require('./routes/sentimentRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // To parse incoming JSON requests

// Routes
app.use('/api/auth', authRoutes);            // Authentication routes

app.use('/api/users', userRoutes);



app.use('/api/social-media', socialMediaRoutes);
app.use('/api/sentiment', sentimentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});