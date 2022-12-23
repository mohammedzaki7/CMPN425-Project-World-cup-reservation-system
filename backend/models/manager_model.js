const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ManagerSchema = new Schema({
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
    sallary: {
        type: Number,
        default: 10000
    },
    position: {
        type: String,
        default: "Middle-Manager"
    }}, {timestamps: true}
);



ManagerSchema.statics.emailInUse = async function(email, id = -1) {
    try {
        const manager = await this.findOne({ email });
        if (manager) {
            if (manager._id == id) {
                return true;
            }
            return false;
        }
        return true;
    } catch (err) {
        throw err;
    }
}



const Manager = mongoose.model('Manager', ManagerSchema);
module.exports = Manager;
