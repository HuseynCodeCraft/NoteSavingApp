const axios = require('../axios.js');
const { validationResult } = require('express-validator');
const xss = require('xss');
const jwt = require('jsonwebtoken');
const { config } = require('../apiConfig.js');

const url = `${config.BASE_HOST}:${config.BASE_PORT}/api/auth/`;

exports.gatewayLogin = async (req, res) => {
  try {
    const response = await axios.post(`${url}login`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

exports.gatewayRegister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, age, email } = req.body;

  try {
    // Forward the request to the internal API service
    const response = await axios.post(`${url}register`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

