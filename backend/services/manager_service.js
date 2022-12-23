const Manager = require('../models/manager_model');

//@method: POST
//@desc: create a new manager
//@access: public
//@status code: 200 - success, 400 - error empty request
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
        res.status(400);
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