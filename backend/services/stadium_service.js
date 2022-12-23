const Stadium = require('../models/stadium_model');

//@method: POST
//@desc: create a new stadium
//@access: public
//@status code: 200 - success, 400 - error empty request, 405 - name already exists, 500 - error in server
exports.createStadium = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    if (!req.body.name || !req.body.length || !req.body.width)  {
        res.status(400).send({ message: "Please fill all the required fields!" });
        return;
    }

    const isNewName = await Stadium.stadiumNameInUse(req.body.name);
    if (!isNewName) {
        res.status(405);
        return res.json({ message: "Stadium Name already exists!" });
    }

    const stadium = new Stadium(req.body);
    stadium.save().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred while creating user." });
    });
}


//@method: GET
//@desc: get stadium by name
//@access: public
//@status code: 200 - success, 400 - error empty request, 404 - not found, 500 - error in server
exports.findStadiumByName = async (req, res) => {
    if (!req.params.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    Stadium.findOne({ name: req.params.name }).then((result) => {
        if (!result) {
            res.status(404).send({ message: "Not found Stadium with name " + req.params.name });
        } else {
            res.send(result);
        }
    }
    ).catch((err) => {
        res.status(500).send({ message: "Error retrieving Stadium with name " + req.params.name });
    }
    );
}


//@method: DELETE
//@desc: delete stadium by name
//@access: public
//@status code: 200 - success, 400 - error empty request, 404 - not found, 500 - error in server
exports.deleteStadiumByName = async (req, res) => {
    if (!req.params.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    Stadium.findOneAndDelete({ name: req.params.name }).then((result) => {
        if (!result) {
            res.status(404).send({ message: "Not found Stadium with name " + req.params.name });
        } else {
            res.send({ message: "Stadium was deleted successfully." });
        }
    }
    ).catch((err) => {
        res.status(500).send({ message: "Error retrieving Stadium with name " + req.params.name });
    }
    );
}