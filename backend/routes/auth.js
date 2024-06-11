const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;


    // Hardcoded admin credentials
    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'Admin@1';

    if (email === adminEmail && password === adminPassword) {
      return res.status(200).json({ message: 'Login successful', email, role: 'admin' });
    }


    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Successful login
    res.status(200).json({ message: 'Login successful', userId: user._id,role: 'user' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;