const Customer = require('../models/customer_model');


//@method: POST
//@desc: create a new customer
//@access: public
//@status code: 200 - success, 400 - error empty request
exports.signup = (req, res) => {
    // validate empty body
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        // console.log(res.statusCode);
        return;
    }
    //checking if any of the required fields are empty
    if (!req.body.name || !req.body.email || !req.body.password || !req.body.age || !req.body.phone || !req.body.address) {
        res.status(400).send({ message: "Please fill all the required fields!" });
        // console.log(res.statusCode);
        return;
    }

    // email is set to unique in the model, so if the email already exists, it will throw an error
    // so we need to check if the email already exists
    Customer.findOne({ email : req.body.email }).then((result) => {
        if (result) {
            res.status(400).send({ message: "Email already exists!" });
            // console.log(res.statusCode);
            return;
        }
    }).catch((err) => {
        console.log(err);
    });


    const customer = new Customer(req.body);
    customer.save().then((result) => {
        res.send(result);
        // console.log(res.statusCode);
    }).catch((err) => {
        console.log(err);
    });
}

//@method: POST
//@desc: create a new customer
//@access: public
//@status code: 200 - success, 400 - error empty request, 404 - email does not exist, 405 - password is incorrect
exports.login = (req, res) => {
    //validate empty body
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    //find the customer with the email
    Customer.findOne({ email : req.body.email }).then((result) => {
        if (!result) {
            res.status(404).send({ message: "Email does not exist!" });
            return;
        }
        //check if the password is correct
        if (result.password == req.body.password) {
            console.log(result);
            res.send(result);
        } else {
            res.status(405).send({ message: "Password is incorrect!" });
        }
    }).catch((err) => {
        console.log(err);
    });
}


//@method: GET
//@desc: get all customers
//@access: public
//@status code: 200 - success, 500 - error server
exports.findAll = (req, res) => {
    Customer.find().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving customers." });
    });
}





















// exports.create = (req, res) => {
//     const customer = new Customer({
//         name: "Arwa",
//         email: "arwa.ibrahim.2000@gmail.com",
//         age: 22,
//         phone: "01000000000",
//         address: "Cairo",
//         reservations: []
//     });
//     customer.save().then((result) => {
//         res.send(result);
//     }).catch((err) => {
//         console.log(err);
//     });
// }






