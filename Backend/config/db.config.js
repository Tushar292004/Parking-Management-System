const mongoose = require('mongoose');
// const logger = require('../logger/api.logger');

const connectDB = () => {

    const url = "mongodb+srv://tusharchandak531:Tushar200429@cluster0.v3m9yqn.mongodb.net/?retryWrites=true&w=majority"

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