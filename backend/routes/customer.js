const express = require('express');
const route = express.Router();
const home_service = require('../services/home_service');
const user_service = require('../services/user_service');

route.get('/', home_service.home);

route.post('/user/signup', user_service.signupUser);
route.post('/user/login', user_service.loginUser);
route.get('/user/manager', user_service.findManagerAll);
route.get('/user/customer', user_service.findCustomerAll);
route.get('/user/search/:id', user_service.findUserByID);
route.put('/user/update/:id', user_service.updateUser);
route.delete('/user/delete/:id', user_service.deleteUser);



module.exports = route;