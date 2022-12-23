const Manager = require('../models/manager_model');

//@method: POST
//@desc: create a new manager
//@access: public
//@status code: 200 - success, 400 - error empty request, 405 - email already exists, 500 - error in server
exports.createManager = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(400).send({ message: "Please fill all the required fields!" });
        return;
    }

    const isNewUser = await Manager.emailInUse(req.body.email);
    if (!isNewUser) {
        res.status(405);
        return res.json({ message: "Email of a manager already exists!" });
    }


    const manager = new Manager(req.body);
    console.log(manager);
    manager.save().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred while creating manager." });
    });
}


//@method: GET
//@desc: find all managers
//@access: public
//@status code: 200 - success, 500 - server error
exports.findManagerAll = (req, res) => {
    Manager.find().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving managers." });
    });
}

//@method: GET
//@desc: find a manager by id
//@access: public
//@status code: 200 - success, 404 - not found, 500 - server error
exports.findManagerByID = (req, res ) => {
    Manager.findById(req.params.id).then((result) => {
        if (result == null) {
            res.status(404).send({ message: "Manager not found with id " + req.params.id });
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
exports.updateManager = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    //check if email is in the params
    if (req.body.email) {
        const isNewUser = await Manager.emailInUse(req.body.email, req.params.id);
        if (!isNewUser) {
            res.status(405);
            return res.json({ message: "New email given already exists in the database!" });
        }
    } 


    Manager.findByIdAndUpdate(req.params.id, req.body , { useFindAndModify: false }).then((result) => {
        if (result == null) {
            res.status(404).send({ message: "Manager not found." });
            return;
        }
        res.send({ message: "Manager was updated successfully." });
    }).catch((err) => {
        res.status(404).send({ message: err.message || "Some error occurred while updating manager." });
    });
}


//@method: DELETE
//@desc: delete a manager by id
//@access: public
//@status code: 200 - success, 404 - not found
exports.deleteManager = (req, res) => {
    Manager.findByIdAndDelete(req.params.id).then((result) => {
        if (result == null) {
            res.status(404).send({ message: "Manager not found." });
            return;
        }
        res.send(result);
    }).catch((err) => {
        res.status(404).send({ message: err.message || "Some error occurred while deleting manager." });
    });
}








// const Manager = require('../models/manager_model');

// //@method: POST
// //@desc: create a new manager
// //@access: public
// //@status code: 200 - success, 400 - error empty request
// exports.createManager = (req, res) => {
//     if (!req.body) {
//         res.status(400).send({ message: "Content can not be empty!" });
//         return;
//     }
//     if (!req.body.name || !req.body.email || !req.body.password) {
//         res.status(400).send({ message: "Please fill all the required fields!" });
//         return;
//     }


//     Manager.findOne({ email : req.body.email }, function(err, user) {
//             if (err) {
//             return done(err);
//             }
//         }).then((result) => {
//         // console.log(result);
//         if (result) {
//             res.status(400).send({ message: "Email of a manager already exists!" });
//         }
//     }).catch((err) => {
//         res.status(500).send({ message: err.message || "Some error occurred while creating manager." });
//     });


//     const manager = new Manager(req.body);
//     console.log(manager);
//     manager.save().then((result) => {
//         res.send(result);
//     }).catch((err) => {
//         res.status(500).send({ message: err.message || "Some error occurred while creating manager." });
//     });
// }