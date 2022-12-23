const User = require('../models/user_model');

//@method: POST
//@desc: create a new user
//@access: public
//@status code: 200 - success, 400 - error empty request, 405 - username already exists, 500 - error in server
exports.signupUser = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    if (!req.body.username || !req.body.email || !req.body.password || !req.body.firstname || !req.body.lastname
        || !req.body.birthdate || !req.body.gender) {
        res.status(400).send({ message: "Please fill all the required fields!" });
        return;
    }

    const isNewUserName = await User.userNameInUse(req.body.username);
    if (!isNewUserName) {
        res.status(405);
        return res.json({ message: "Username already exists!" });
    }

    //check if role is empty
    if (req.body.role) {
        req.body.role = req.body.role.toLowerCase();
        console.log(req.body.role);
    }
    const user = new User(req.body);
    user.save().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred while creating user." });
    });
}


//@method: POST
//@desc: create a new customer
//@access: public
//@status code: 200 - success, 400 - error empty request, 404 - email does not exist, 405 - password is incorrect
exports.loginUser = (req, res) => {
    //validate empty body
    if (!req.body || !req.body.username || !req.body.password) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    //find the customer with the username
    User.findOne({ username : req.body.username }).then((result) => {
        if (!result) {
            res.status(404).send({ message: "username does not exist!" });
            return;
        }
        //check if the password is correct
        if (result.password == req.body.password) {
            res.send(result);
        } else {
            res.status(405).send({ message: "Password is incorrect!" });
        }
    }).catch((err) => {
        console.log(err);
    });
}

//@method: GET
//@desc: find all managers
//@access: public
//@status code: 200 - success, 500 - server error
exports.findManagerAll = (req, res) => {
    // find users where role is manager
    User.find({ role: 'manager' }).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving managers." });
    });
}


//@method: GET
//@desc: find all customers
//@access: public
//@status code: 200 - success, 500 - server error
exports.findCustomerAll = (req, res) => {
    User.find({ role: 'fan' }).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving fans." });
    });
}


//@method: GET
//@desc: find a user by id
//@access: public
//@status code: 200 - success, 404 - not found, 500 - server error
exports.findUserByID = (req, res ) => {
    User.findById(req.params.id).then((result) => {
        if (result == null) {
            res.status(404).send({ message: "user not found with id " + req.params.id });
            return;
        }
        res.send(result);
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving manager." });
    });
}



//@method: PUT
//@desc: update a manager by id
//@access: public
//@status code: 200 - 400 - error empty request, success, 404 - not found, 405 - email already exists
exports.updateUser = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    //check if email is in the params
    if (req.body.username) {
        const isNewUsername = await User.userNameInUse(req.body.username, req.params.id);
        if (!isNewUsername) {
            res.status(405);
            return res.json({ message: "Chosen username already exists in the database!" });
        }
    } 

    //cannot change role from manager to fan or vice versa
    if (req.body.role) {
        res.status(405);
        return res.json({ message: "Cannot change role!" });
    }

    User.findByIdAndUpdate(req.params.id, req.body , { useFindAndModify: false }).then((result) => {
        if (result == null) {
            res.status(404).send({ message: "User not found." });
            return;
        }
        res.send({ message: "User was updated successfully." });
    }).catch((err) => {
        res.status(404).send({ message: err.message || "Some error occurred while updating manager." });
    });
}


//@method: DELETE
//@desc: delete a manager by id
//@access: public
//@status code: 200 - success, 404 - not found
exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id).then((result) => {
        if (result == null) {
            res.status(404).send({ message: "User not found." });
            return;
        }
        res.send({ message: "User was deleted successfully." });
    }).catch((err) => {
        res.status(404).send({ message: err.message || "Some error occurred while deleting manager." });
    });
}

