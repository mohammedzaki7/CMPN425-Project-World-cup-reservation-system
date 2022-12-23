const express = require('express');
const route = express.Router();
const home_service = require('../services/home_service');
const customer_service = require('../services/customer_service');
const manager_service = require('../services/manager_service');

route.get('/', home_service.home);

//customer routes
route.get('/customer/search', customer_service.findCustomerAll);
route.post('/customer/signup', customer_service.signupCustomer);
route.post('/customer/login', customer_service.loginCustomer);
route.get('/customer/search/:id', customer_service.findCustomerByID);
route.put('/customer/update/:id', customer_service.updateCustomer); // TODO: check it again
route.delete('/customer/delete/:id', customer_service.deleteCustomer);

//Manager routes
route.post('/manager/create', manager_service.createManager);
route.get('/manager/search', manager_service.findManagerAll);
route.get('/manager/search/:id', manager_service.findManagerByID);
route.put('/manager/update/:id', manager_service.updateManager);
route.delete('/manager/delete/:id', manager_service.deleteManager);

module.exports = route;