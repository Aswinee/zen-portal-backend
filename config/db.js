const mongoose = require("mongoose");

const connect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to database.");
  } catch (error) {
    console.log(error, "could not connect database.");
  }
};

module.exports = connect;
