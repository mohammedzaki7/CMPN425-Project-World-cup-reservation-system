// creating a customer schema and model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        default: false
    },
    age: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    reservations: [{
        type: Schema.Types.ObjectId,
        ref: 'Reservation'
    }]
}, {timestamps: true});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;

    