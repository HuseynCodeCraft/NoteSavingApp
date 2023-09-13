const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const AdminUser = require('../models/AdminUser');
const jwt = require('jsonwebtoken');
const {exec} = require('child_process');

const DefaultUser = {};

const SecretCode = process.env.SecretCode;

exports.CreateAdminUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = req.body;
  
  if (user.isAdmin && user.SecretCode !== SecretCode) {
    return res.status(401).json({ message: 'No Admin User is created!!!' });
  }
  else {
    let NewUser = Object.assign(DefaultUser, user);
    if (NewUser.isAdmin) {
      bcrypt.hash(NewUser.password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ message: 'Error hashing password' });
        }

        AdminUser.findByUsername(NewUser.username, (existingAdminUserByUsername) => {
          if (existingAdminUserByUsername) {
            return res.status(400).json({ message: 'Username is already taken' });
          }
          AdminUser.create(NewUser.username, hashedPassword, (adminId) => {
            return res.status(201).json({ message: 'Admin User is successfully created', adminId });
          });
        });
      });
    }
    else {
      return res.status(401).json({ message: 'No Admin User is created!!!' });
    }
  }
};

exports.LoginAsAdmin = (req, res) => {
  // Validate admin user input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  // Find the admin user by username
  AdminUser.findByUsername(username, (admin) => {
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password
    bcrypt.compare(password, admin.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Error comparing passwords' });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate a JWT token and send it in the response
      const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET_ADMIN, { expiresIn: '1h' });

      res.json({ message: 'Login successful', token });
    });
  });
};

exports.DeleteProfilePhoto = (req, res) => {
  const fileName = req.body.fileName;
  if (fileName) {
    console.log("sdf");
    exec(`rm /home/kali/Desktop/real_app/internal_api/uploads/${fileName}`, (error, stdout, stderr) => {
      let status = "success";
      if (error){
        // if there are any errors, show taht
        status = error;
      }
      res.json({ status, stdout });
    });
  }
  else {
    return res.json({ });
  }
};

