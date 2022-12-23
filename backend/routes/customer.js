const express = require('express');
const route = express.Router();
const customer_service = require('../services/customer_service');

route.get('/', customer_service.home)

route.get('/customer', (req, res) => {
    res.send('Hello Customer!');
  });

module.exports = route;