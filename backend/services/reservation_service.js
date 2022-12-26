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
    else{
        // check if user is approved
        if (user.approved == false) {
            res.status(405).send({ message: "User is not yet approved!" });
            return;
        }
    }
    const row = req.body.seat[0];
    const column = req.body.seat[1];


    // check if match exists and if seat position is empty in match where seat is a list [row, column]
    const match = await Match.findById(req.body.matchid);
    // check if seat is out of bounds of the matches seats
    if ((row >= match.seats.length) || (column >= match.seats[0].length || (row < 0) || (column < 0))) {
        res.status(405).send({ message: "Seat out of bounds!" });
        return;
    }

    if (!match) {
        res.status(404).send({ message: "Match not found!" });
        return;
    }
    if (match.seats[row][column] == 1) {
        res.status(405).send({ message: "Seat already taken!" });
        return;
    }



    // find match by id and update match seats
    match.seats[row][column] = 1;
    Match.findByIdAndUpdate(req.body.matchid, { seats: match.seats }, { useFindAndModify: false }).then((result) => {
        console.log(" seat in match is now = " + match.seats[row][column]);
    }
    ).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred while updating match." });
    }
    );


    // create reservation
    const reservation = new Reservation(req.body);
    reservation.save().then((result) => {
        res.send(result);
    }
    ).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred while creating reservation." });
    }
    );
}


//@method: GET
//@desc: get all reservations of a user
//@access: public
//@status code: 200 - success, 400 - error empty request, 404 - not found, 500 - error in server
exports.findUserReservations = (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ message: "Content can not be empty!" });
        return;
    }


    // check if user exists
    User.findById(req.params.id).then((result) => {}
    ).catch((err) => {
        res.status(404);
        return;
    });

    Reservation.find({ userid: req.params.id }).then((result) => {
        res.send(result);
        return;
    }
    ).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving reservations." });
        return;
    }
    );
}


//@method: GET
//@desc: get all reservations of a match
//@access: public
//@status code: 200 - success, 400 - error empty request, 404 - not found, 500 - error in server
exports.findMatchReservations = (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ message: "Content can not be empty!" });
        return;
    }

    // check if match exists
    Match.findById(req.params.id).then((result) => {}
    ).catch((err) => {
        res.status(404);
        return;
    });

    Reservation.find({ matchid: req.params.id }).then((result) => {
        res.send(result);
        return;
    }
    ).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving reservations." });
        return;
    }
    );
}


//@method: DELETE
//@desc: delete a reservation, update match seats
//@access: public
//@status code: 200 - success, 400 - error empty request, 404 - not found, 500 - error in server
exports.deleteReservation = (req, res) => {    
    Reservation.findByIdAndDelete(req.params.id).then((result) => {
        // update match seats
        row = result.seat[0];
        column = result.seat[1];
        //find one and update
        Match.findByIdAndUpdate(result.matchid, { $set: { ["seats." + row + "." + column]: 0 } }, { useFindAndModify: false }).then((result) => {
            console.log(" seat in match is now = " + result.seats[row][column]);
        }
        ).catch((err) => {
            res.status(500).json({ message: err.message || "Some error occurred while updating match." });
            return;
        });

        res.send({ message: "Reservation was deleted successfully!" });
        return;
    }
    ).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred while deleting reservation." });
        return;
    }
    );
}