const express = require('express');
const route = express.Router();
const home_service = require('../services/home_service');
const user_service = require('../services/user_service');
const stadium_service = require('../services/stadium_service');
const match_service = require('../services/match_service');
const reservation_service = require('../services/reservation_service');

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
route.get('/stadium/view', stadium_service.getAllStadiums);
route.get('/stadium/search/:id', stadium_service.findStadiumByID);////////////////////////////////////////
route.delete('/stadium/delete/:id', stadium_service.deleteStadiumByID);///////////////////////////////////

// Match routes
route.post('/match/create', match_service.createMatch);
route.get('/match/view/seats', match_service.getAllMatchesSeats);
route.get('/match/view/noseats', match_service.getAllMatchesNoSeats);
route.get('/match/search/:id', match_service.findMatchByID);
route.put('/match/update/:id', match_service.updateMatchID);

// Reservation routes
route.post('/reservation/create', reservation_service.createReservation);
route.get('/reservation/user/:id', reservation_service.findUserReservations);
route.get('/reservation/match/:id', reservation_service.findMatchReservations);
route.delete('/reservation/delete/:id', reservation_service.deleteReservation);





module.exports = route;