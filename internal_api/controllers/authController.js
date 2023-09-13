const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const xss = require('xss');
const User = require('../models/User');
const jwt = require('jsonwebtoken'); // For generating tokens

exports.register = (req, res) => {
  // Validate user input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, age, email } = req.body;

  // Check if a user with the same username or email already exists
  User.findByEmail(email, (existingUserByEmail) => {
    if (existingUserByEmail) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    User.findByUsername(username, (existingUserByUsername) => {
      if (existingUserByUsername) {
        return res.status(400).json({ message: 'Username is already taken' });
      }

      // Hash the password before storing it
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ message: 'Error hashing password' });
        }

        const newUser = {
          username: xss(username), // Sanitize username
          password: hashedPassword,
          age: parseInt(age), // Convert to integer
          email: xss(email), // Sanitize email
        };

        User.create(newUser, (userId) => {
          res.status(201).json({ message: 'User registered successfully', userId });
        });
      });
    });
  });
};

exports.login = (req, res) => {
  // Validate user input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  // Find the user by email
  User.findByEmail(email, (user) => {
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Error comparing passwords' });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate a JWT token and send it in the response
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '30m' });

      res.json({ message: 'Login successful', token });
    });
  });
};
