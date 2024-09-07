const mongoose = require('mongoose');
require('dotenv').config();
// const logger = require('../logger/api.logger');

const connectDB = () => {

    const url = process.env.MONODB_URI ;

    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    mongoose.connection.once("open", async () => {
        console.log("Connected to database");
    });
      
    mongoose.connection.on("error", (err) => {
        console.log("Error connecting to database  ", err);
    });
}

module.exports = {
    connectDB
}