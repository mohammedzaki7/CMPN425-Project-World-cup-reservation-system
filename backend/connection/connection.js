// creating a connection to a mongoDB database using mongoose
var mongoose = require('mongoose');
mongoose.set("strictQuery", false);

const connectionString = "mongodb+srv://ArwaShamardal:KljJfKUp2bnD0nue@worldcupcluster.zgddwfn.mongodb.net/WorldCupDB?retryWrites=true&w=majority";


const connectDB = async() => {
    await mongoose.connect(connectionString, 
                        {useUnifiedTopology: true, 
                        useNewUrlParser: true}).then((result) =>{    
                            console.log('MongoDB Connected...');
                        }
                        ).catch((err) => console.log(err));
}

module.exports = connectDB;