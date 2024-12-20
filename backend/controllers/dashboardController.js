const Department = require("../models/Department");
const Employee = require("../models/Employee"); // Add this import
const Leave = require("../models/Leave"); // Add this import

const getSummary = async (req, res) => {
  try {
    // console.log("Counting total employees...");
    const totalEmployees = await Employee.countDocuments();
    // console.log("Total employees:", totalEmployees);

    // console.log("Counting total departments...");
    const totalDepartments = await Department.countDocuments();
    // console.log("Total departments:", totalDepartments);

    // console.log("Calculating total salaries...");
    const totalSalaries = await Employee.aggregate([
      { $group: { _id: null, totalSalary: { $sum: "$salary" } } },
    ]);
    // console.log("Total salaries:", totalSalaries);

    // console.log("Finding employees who applied for leave...");
    const employeeAppliedForLeave = await Leave.distinct("employeeId");
    // console.log("Employees applied for leave:", employeeAppliedForLeave);

    // console.log("Aggregating leave statuses...");
    const leaveStatus = await Leave.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    // console.log("Leave statuses:", leaveStatus);

    const leaveSummary = {
      appliedFor: employeeAppliedForLeave.length,
      approved: leaveStatus.find((item) => item._id === "Approved")?.count || 0,
      rejected: leaveStatus.find((item) => item._id === "Rejected")?.count || 0,
      pending: leaveStatus.find((item) => item._id === "Pending")?.count || 0,
    };

    // console.log("Leave summary:", leaveSummary);

    return res.status(200).json({
      success: true,
      totalEmployees,
      totalDepartments,
      totalSalary: totalSalaries[0]?.totalSalary || 0,
      leaveSummary,
    });
  } catch (error) {
    console.error("Error in getSummary:", error);
    return res
      .status(500)
      .json({ success: false, error: "dashboard summary error" });
  }
};

module.exports = { getSummary };
