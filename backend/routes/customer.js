const express = require('express');
const route = express.Router();
const home_service = require('../services/home_service');
const customer_service = require('../services/customer_service');

route.get('/', home_service.home);

route.post('/customer', customer_service.signup);

module.exports = route;