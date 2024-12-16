const mongoose = require("mongoose");
const Schema = require("mongoose");
const employeeSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employeeId: {
      type: String,
      required: true,
      unoque: true,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
    },
    maritalStatus: {
      type: String,
    },
    designation: {
      type: String,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
