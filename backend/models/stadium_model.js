const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StadiumSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    length: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true
    }
});

StadiumSchema.statics.stadiumNameInUse = async function(name, id = -1) {
    try {
        const stadium = await this.findOne({ name });
        if (stadium) {
            if (stadium._id == id) {
                return true;
            }
            return false;
        }
        return true;
    } catch (err) {
        throw err;
    }
}

const Stadium = mongoose.model('Stadium', StadiumSchema);
module.exports = Stadium;

