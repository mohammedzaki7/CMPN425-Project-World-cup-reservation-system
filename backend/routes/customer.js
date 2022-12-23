const express = require('express');
const route = express.Router();
const home_service = require('../services/home_service');
const customer_service = require('../services/customer_service');

route.get('/', home_service.home);

route.get('/customer', customer_service.findAll);
route.post('/customer/signup', customer_service.signup);
route.post('/customer/login', customer_service.login);


module.exports = route;