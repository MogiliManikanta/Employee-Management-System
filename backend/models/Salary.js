const mongoose = require("mongoose");
const Schema = require("mongoose");
const salarySchema = mongoose.Schema({
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  basicSalary: {
    type: Number,
    require: true,
  },
  allowances: { type: Number },
  deductions: { type: Number },
  netSalary: { type: Number },
  payDate: {
    type: Date,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Salary", salarySchema);
