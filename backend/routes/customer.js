const express = require('express');
const route = express.Router();
const home_service = require('../services/home_service');
const customer_service = require('../services/customer_service');

route.get('/', home_service.home);

route.get('/customer/search', customer_service.findCustomerAll);
route.post('/customer/signup', customer_service.signupCustomer);
route.post('/customer/login', customer_service.loginCustomer);
route.get('/customer/search/:id', customer_service.findCustomerByID);
route.put('/customer/update/:id', customer_service.updateCustomer); // TODO: check it again
route.delete('/customer/delete/:id', customer_service.deleteCustomer);



module.exports = route;