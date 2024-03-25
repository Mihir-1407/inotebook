const mongoose =  require('mongoose');
const mongoURI = "mongodb://localhost:27017/Notebook";

const connectMongo =()=>{
    mongoose.connect(mongoURI)
}

module.exports = connectMongo;