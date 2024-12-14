const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log("successfully connected to our database"));
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDatabase;
