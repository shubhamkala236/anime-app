const mongoose = require("mongoose");

const URL = process.env.MONGODB_URI;

const connect = async() => {
    try {
      await mongoose.connect(URL);
      console.log(`Database connected`);
    } catch (error) {
      console.log(error);
      console.log(URL);
    }
}


module.exports = connect;