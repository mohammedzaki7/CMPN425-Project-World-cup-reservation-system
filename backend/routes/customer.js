const express = require('express');
const customer = express.Router();

customer.get('/', (req, res) => {
    res.send('Hello World!');
  });

module.exports = customer;