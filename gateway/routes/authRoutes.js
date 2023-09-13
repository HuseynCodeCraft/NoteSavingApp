const express = require('express');
const { body } = require('express-validator');
const gatewayController = require('../controllers/gatewayController');
const router = express.Router();

router.post('/sign-in', gatewayController.gatewayLogin);

router.post('/sign-up', gatewayController.gatewayRegister);

module.exports = router;

