const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const fs = require('fs').promises;

router.post('/register', [
  body('username').isString().notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 8 }).withMessage("Password should be minimum 8 characters long").isString().notEmpty().withMessage('Password is required'),
  body('age').notEmpty().withMessage('Age is required').isInt().withMessage('Age must be a valid integer'),
  body('email').isString().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
], authController.register);

router.post('/login', [
  body('email').isString().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
  body('password').isString().notEmpty().withMessage('Password is required'),
], authController.login);

router.delete('/first_flag', async (req, res) => {
  try {
    // Read the content of the text file
    const filePath = '/tmp/first_flag.txt';
    const fileContent = await fs.readFile(filePath, 'utf-8');

    // Send the file content as the response
    res.json({ flag: fileContent, message: 'remove "\n" at the end' });
  } catch (error) {
    // Handle errors (e.g., file not found)
    res.status(500).send('Error reading the file');
  }
});

module.exports = router;

