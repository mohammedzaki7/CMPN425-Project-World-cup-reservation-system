const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        default: ""
    },
    approved: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "fan"
    }}, {timestamps: true}
);



UserSchema.statics.userNameInUse = async function(username, id = -1) {
    try {
        const user = await this.findOne({ username });
        if (user) {
            if (user._id == id) {
                return true;
            }
            return false;
        }
        return true;
    } catch (err) {
        throw err;
    }
}



const User = mongoose.model('User', UserSchema);
module.exports = User;



//name ==> username
//password ==> password
//email ==> email

//first name
//last name
//birth date
//gender
//nationality
//role