const Stadium = require('../models/stadium_model');
const Match = require('../models/match_model');

//@method: POST
//@desc: create a new match given the stadium name
//@access: public
//@status code: 200 - success, 400 - error empty request, 404 - not found, 500 - error in server
exports.createMatch = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    if (!req.body.teamone || !req.body.teamtwo || !req.body.stadiumname || !req.body.date || !req.body.referee || !req.body.linesmen)  {
        res.status(400).send({ message: "Please fill all the required fields!" });
        return;
    }
    if (req.body.linesmen.length != 2) {
        res.status(400).send({ message: "Please fill two linesmen!" });
        return;
    }
    Stadium.findOne({ name: req.body.stadiumname }).then((result) => {
        if (!result) {
            res.status(404).send({ message: "Not found Stadium with name " + req.body.stadiumname });
        } else {
            // make seats array of size length*width and fill with false
            req.body.seats = new Array(result.length);
            for (let i = 0; i < result.length; i++) {
                req.body.seats[i] = new Array(result.width);
                for (let j = 0; j < result.width; j++) {
                    req.body.seats[i][j] = false;
                }
            }

            const match = new Match(req.body);
            match.save().then((result) => {
                res.send(result);
            }).catch((err) => {
                res.status(500).send({ message: err.message || "Some error occurred while creating user." });
            });
        }
    }
    ).catch((err) => {
        res.status(500).send({ message: "Error retrieving Stadium with name " + req.body.stadiumname });
    });
}

//@method: GET
//@desc: get all matches
//@access: public
//@status code: 200 - success, 500 - error in server
exports.getAllMatches = async (req, res) => {
    Match.find().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving matches." });
    });
}

//@method: GET
//@desc: get a match by id
//@access: public
//@status code: 200 - success, 404 - not found, 500 - error in server
exports.findMatchByID = async (req, res) => {
    Match.findById(req.params.id).then((result) => {
        if (!result) {
            res.status(404).send({ message: "Not found Match with id " + req.params.id });
        } else {
            res.send(result);
        }
    }).catch((err) => {
        res.status(500).send({ message: "Error retrieving Match with id " + req.params.id });
    });
}




//@method: PUT
//@desc: update a match by id
//@access: public
//@status code: 200 - success, 400 - error empty request, 404 - not found, 500 - error in server
// update seats array if stadium name is changed, it retrieves the stadium and makes a new seats array,
// and retrieves the match unchanged parameters and updates the new parameters
exports.updateMatchID = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // if stadium name is changed
    if (req.body.stadiumname) {
        Stadium.findOne({ name : req.body.stadiumname }).then((result) => {
            if (!result) {
                res.status(404).send({ message: "Not found Stadium with name " + req.body.stadiumname });
            } else {
                // make seats array of size length*width and fill with false
                req.body.seats = new Array(result.length);
                for (let i = 0; i < result.length; i++) {
                    req.body.seats[i] = new Array(result.width);
                    for (let j = 0; j < result.width; j++) {
                        req.body.seats[i][j] = false;
                    }
                }   
            }
            //find and update the match
            Match.findByIdAndUpdate(req.params.id, req.body , { useFindAndModify: false }).then((result) => {
                if (!result) {
                    res.status(404).send({ message: "Not found Match with id " + req.params.id });
                } else {
                    res.send({ message: "Match was updated successfully." });
                }
            }).catch((err) => {
                res.status(500).send({ message: "Error updating Match with id " + req.params.id });
            }
            );
        }).catch((err) => {
            res.status(500).send({ message: "Error retrieving Stadium with name " + req.body.stadiumname });
        });}
        else {
            Match.findByIdAndUpdate(req.params.id, req.body , { useFindAndModify: false }).then((result) => {
                if (!result) {
                    res.status(404).send({ message: "Not found Match with id " + req.params.id });
                } else {
                    res.send({ message: "Match was updated successfully." });
                }
            }
            ).catch((err) => {
                res.status(500).send({ message: "Error updating Match with id " + req.params.id });
            });
        }             
}