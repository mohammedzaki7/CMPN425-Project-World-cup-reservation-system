const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    matchid: {
        type: String,
        required: true
    },
    cnn:{
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true
    },
    seat: {
        type: [Number],
        required: true
    }} , {timestamps: true}
);

const Reservation = mongoose.model("Reservation", ReservationSchema);
module.exports = Reservation;
