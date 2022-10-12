//This file handles connection logic to MongoDB
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI, {useNewUrlParser: true}).then(() => {
    console.log('Connected to MongoDB successfully.')
}).catch((e) => {
    console.log("Error connecting to MongoDB");
    console.log(e);
});

// const db = mongoose.connection;



module.exports = {
    mongoose,
    // db
}; 


