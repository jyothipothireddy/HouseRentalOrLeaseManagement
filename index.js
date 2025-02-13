const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./UserModel');

const app = express();

app.use(cors());
app.use(express.json());  

// MongoDB Connection
mongoose
  .connect('mongodb://localhost:27017/HouseRental', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Register Endpoint
app.post('/api/user/signup', async (req, res) => {
  console.log('Received Data:', req.body);  // Log the request body

  try {
    const { username, name, email, password } = req.body;

    if (!username || !name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Further processing...
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
});

// Start Server
app.listen(5000, () => console.log('Server running on port 5000'));
