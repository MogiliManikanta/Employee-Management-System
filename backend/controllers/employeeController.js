const Employee = require("../models/Employee");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Department = require("../models/Department");
const mongoose = require("mongoose");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "public/uploads";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      // Remove uploaded file if user exists
      if (req.file) {
        fs.unlinkSync(`public/uploads/${req.file.filename}`);
      }
      return res
        .status(400)
        .json({ success: false, error: "User already registered" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "default.png", // Use default image if none uploaded
    });
    await newUser.save();

    // Save new employee
    const newEmployee = new Employee({
      userId: newUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });
    await newEmployee.save();

    return res
      .status(200)
      .json({ success: true, message: "Employee created successfully" });
  } catch (error) {
    console.error("Error in addEmployee:", error);

    // Cleanup uploaded file in case of error
    if (req.file) {
      fs.unlinkSync(`public/uploads/${req.file.filename}`);
    }

    return res
      .status(500)
      .json({ success: false, error: "Server error in adding employee" });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({ success: true, employees }); // Updated key
  } catch (error) {
    console.error(error); // Log the error
    return res
      .status(500)
      .json({ success: false, error: "get employee server error" });
  }
};

const getEmployee = async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, error: "Invalid ID format" });
  }

  try {
    let employee;

    // First attempt: Find by _id
    employee = await Employee.findById(id)
      .populate("userId", { password: 0 })
      .populate("department");

    // Second attempt: Find by userId if employee not found
    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");
    }

    // console.log("Fetched Employee:", employee); // Debugging log

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }

    return res.status(200).json({ success: true, employee });
  } catch (error) {
    // console.error("Error fetching employee:", error);
    return res
      .status(500)
      .json({ success: false, error: "get employee server error" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, designation, department, salary } = req.body;

    const employee = await Employee.findById({ _id: id });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "employee not found" });
    }
    const user = await User.findById({ _id: employee.userId });
    if (!user) {
      return res.status(404).json({ success: false, error: "user not found" });
    }
    const updateUser = await User.findByIdAndUpdate(
      { _id: employee.userId },
      { name }
    );

    const updateEmployee = await Employee.findByIdAndUpdate(
      { _id: id },
      {
        maritalStatus,
        designation,
        salary,
        department,
      }
    );

    if (!updateEmployee || !updateUser) {
      return res
        .status(404)
        .json({ success: false, error: "document not found" });
    }

    return res.status(200).json({ success: true, message: "employee updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "update employees server error" });
  }
};

const fetchEmployeesByDepId = async (req, res) => {
  const { id } = req.params;
  try {
    // Validate the department ID
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res
    //     .status(400)
    //     .json({ success: false, error: "Invalid department ID" });
    // }

    // Fetch employees by department ID
    const employees = await Employee.find({ department: id });

    // Check if employees exist
    if (employees.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No employees found for this department",
      });
    }

    console.log(employees);
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error(
      "Error fetching employees by department ID:",
      error.message,
      error.stack
    );
    return res
      .status(500)
      .json({ success: false, error: "Server error while fetching employees" });
  }
};

module.exports = {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  updateEmployee,
  fetchEmployeesByDepId,
};
