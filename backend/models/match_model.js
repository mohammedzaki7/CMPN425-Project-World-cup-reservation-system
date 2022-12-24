const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// linesmen is an array of two strings
// seats is a 2D array of boolean values
const MatchSchema = new Schema({
    teamone: {
        type: String,
        required: true
    },
    teamtwo: {
        type: String,
        required: true
    },
    stadiumname: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    referee: {
        type: String,
        required: true
    },
    linesmen: {
        type: [String],
        required: true
    },
    seats: {
        type: [[Boolean]]
    }}
);

const Match = mongoose.model("Matches", MatchSchema);
module.exports = Match;
