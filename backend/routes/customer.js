const express = require('express');
const route = express.Router();
const home_service = require('../services/home_service');
const user_service = require('../services/user_service');
const stadium_service = require('../services/stadium_service');

route.get('/', home_service.home);

// User routes
route.post('/user/signup', user_service.signupUser);
route.post('/user/login', user_service.loginUser);
route.get('/user/manager/:approved', user_service.findAllManager);
route.get('/user/customer/:approved', user_service.findAllCustomer);
route.get('/user/approval/:approved', user_service.findAllUserByApproval);
route.get('/user/search/:id', user_service.findUserByID);
route.put('/user/update/:id', user_service.updateUser);
route.delete('/user/delete/:id', user_service.deleteUser);

// Stadium routes
route.post('/stadium/create', stadium_service.createStadium);
route.get('/stadium/search/:name', stadium_service.findStadiumByName);
route.delete('/stadium/delete/:name', stadium_service.deleteStadiumByName);





module.exports = route;