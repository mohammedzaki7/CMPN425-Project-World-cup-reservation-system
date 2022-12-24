const Match = require('../models/match_model');
const User = require('../models/user_model');
const Reservation = require('../models/reservation_model');


//@method: POST
//@desc: create a new stadium
//@access: public
//@status code: 200 - success, 400 - error empty request, 404 user/match not found, 405 - seat already taken, 500 - error in server
exports.createReservation = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    if (!req.body.matchid || !req.body.userid || !req.body.seat)  {
        res.status(400).send({ message: "Please fill all the required fields!" });
        return;
    }

    // check if user exists
    const user = await User.findById(req.body.userid);
    if (!user) {
        res.status(404).send({ message: "User not found!" });
        return;
    }

    // check if match exists and if seat position is empty in match where seat is a list [row, column]
    const match = await Match.findById(req.body.matchid);
    if (!match) {
        res.status(404).send({ message: "Match not found!" });
        return;
    }
    if (match.seats[req.body.seat[0]][req.body.seat[1]] != 0) {
        res.status(405);
        return res.json({ message: "Seat already taken!" });
    }

    // create reservation
    const reservation = new Reservation(req.body);
    reservation.save().then((result) => {
        res.send(result);
    }
    ).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred while creating reservation." });
    }
    );

    // update match seats
    match.seats[req.body.seat[0]][req.body.seat[1]] = 1;
    match.save().then((result) => {
        res.send(result);
    }
    ).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred while updating match." });
    }
    );
}

