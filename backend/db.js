// this file is for connnect local server to mongo

const mongoose= require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017";

const connectToMongo = () =>{
    mongoose.connect(mongoURI,() => {
        console.log("success connect to mongo")
    })
}

module.exports = connectToMongo;