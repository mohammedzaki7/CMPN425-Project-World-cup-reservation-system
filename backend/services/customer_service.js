const Customer = require('../models/customer_model');


//@method: POST
//@desc: create a new customer
//@access: public
//@status code: 200 - success, 400 - error empty request, 500 - error in server
exports.signupCustomer = (req, res) => {
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
            req.res.status(400).send({ message: "Email of a customer already exists!" });
            return;
            // res.status(400);
            // return res.json({ message: "Email of a customer already exists!" });
        }
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred while creating customers." });
    });


    const customer = new Customer(req.body);
    customer.save().then((result) => {
        res.send(result);
        // console.log(res.statusCode);
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred while creating customer." });
    });
}

//@method: POST
//@desc: create a new customer
//@access: public
//@status code: 200 - success, 400 - error empty request, 404 - email does not exist, 405 - password is incorrect
exports.loginCustomer = (req, res) => {
    //validate empty body
    if (!req.body || !req.body.email || !req.body.password) {
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
exports.findCustomerAll = (req, res) => {
    Customer.find().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving customers." });
    });
}

//@method: GET
//@desc: get one customer by id
//@access: public
//@status code: 200 - success, 400 - error empty request, 404 - customer not found, 500 - error server
exports.findCustomerByID = (req, res) => {
    if (req.params.id) {
        Customer.findById(req.params.id).then((result) => {
            if (!result) {
                res.status(404).send({ message: "Cannot found Customer with id " + req.params.id });
            } else {
                res.send(result);
            }
        }).catch((err) => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving the customer." });
        });
    } else {
        res.status(400).send({ message: "ID isn't sent." });
    }
}


//@method: PUT
//@desc: update a customer
//@access: public
//@status code: 200 - success, 400 - error empty request, 404 - customer not found, 500 - error server
exports.updateCustomer = (req, res) => {
    if (req.params.id) {
        Customer.findByIdAndUpdate(req.params.id , req.body , { useFindAndModify: false }).then((result) => {
            res.send({ message: "Customer was updated successfully." });
        }).catch((err) => {
            res.status(404).send({ message: err.message || "Some error occurred while updating the customer." });
        });
    } else {
        res.status(400).send({ message: "ID isn't sent." });
    }
}


//@method: DELETE
//@desc: delete a customer
//@access: public
//@status code: 200 - success, 400 - error empty request, 404 - customer not found, 500 - error server
exports.deleteCustomer = (req, res) => {
    if (req.params.id) {
        Customer.findByIdAndDelete(req.params.id).then((result) => {
            res.send({ message: "Customer was deleted successfully." });
        }).catch((err) => {
            res.status(404).send({ message: err.message || "Some error occurred while deleting the customer." });
        });
    } else {
        res.status(400).send({ message: "ID isn't sent." });
    }
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






