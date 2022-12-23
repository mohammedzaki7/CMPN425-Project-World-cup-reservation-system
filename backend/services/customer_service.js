const Customer = require('../models/customer_model');


//@method: POST
//@desc: create a new customer
//@access: public
//@status code: 200 - success, 400 - error (email already exists or empty body)
exports.signup = (req, res) => {
    // validate empty body
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
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






