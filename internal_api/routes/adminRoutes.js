const express = require('express');
const { body } = require('express-validator');
const adminController = require('../controllers/adminController'); // Import the admin controller here
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create-admin-user', [
  body('username').isString().notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 8 }).withMessage("Password should be minimum 8 characters long").isString().notEmpty().withMessage('Password is required'),
], adminController.CreateAdminUser);

router.post('/login-as-admin', [
  body('username').isString().notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 8 }).withMessage("Password should be minimum 8 characters long").isString().notEmpty().withMessage('Password is required'),
], adminController.LoginAsAdmin);

router.post('/delete-profile-photo', authMiddleware.isAdminUser, adminController.DeleteProfilePhoto);

module.exports = router;

