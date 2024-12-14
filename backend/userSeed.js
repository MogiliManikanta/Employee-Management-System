const User = require("./models/User.js");
const bcrypt = require("bcryptjs");
const connectToDatabase = require("./db/db.js");

const userRegister = async () => {
  connectToDatabase();
  try {
    const hashPassword = await bcrypt.hash("admin", 10);
    const newUser = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin",
    });
    await newUser.save();
  } catch (error) {
    console.log(error);
  }
};

module.exports = userRegister;