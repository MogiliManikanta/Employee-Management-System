const Employee = require("../models/Employee");
const Leave = require("../models/Leave");

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;
    const employee = await Employee.findOne({ userId });
    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "leave add server error" });
  }
};

const getLeaves = async (req, res) => {
  try {
    const { id, role } = req.params;
    let leaves;
    if (role === "admin") {
      // Fetch leaves directly for the employeeId
      leaves = await Leave.find({ employeeId: id });
    }
    // If no leaves are found, try to fetch employee by userId and get leaves
    else {
      const employee = await Employee.findOne({ userId: id });

      // Ensure employee exists before querying for leaves
      if (employee) {
        leaves = await Leave.find({ employeeId: employee._id });
      }
      // else {
      //   return res
      //     .status(404)
      //     .json({ success: false, error: "Employee not found" });
      // }
    }

    // console.log(leaves);

    // Return the response
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.log(error.message); // Fixed the typo
    return res
      .status(500)
      .json({ success: false, error: "leave get server error" });
  }
};

const allLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: "name",
        },
      ],
    });

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.log(error.meaasge);
    return res
      .status(500)
      .json({ success: false, error: "leave all  get server error" });
  }
};

const getDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const leaves = await Leave.findById({ _id: id }).populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name", // Correct field selection
        },
        {
          path: "userId",
          select: "name profileImage", // Use space instead of a comma
        },
      ],
    });

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error("Error:", error.message); // Correct typo in 'message'
    return res
      .status(500)
      .json({ success: false, error: "Leave details fetch server error" });
  }
};

const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findByIdAndUpdate(
      { _id: id },
      { status: req.body.status }
    );
    if (!leave) {
      return res
        .status(404)
        .json({ success: false, error: "Leave not founded" });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error:", error.message); // Correct typo in 'message'
    return res
      .status(500)
      .json({ success: false, error: "Leave update server error" });
  }
};

module.exports = {
  addLeave,
  getLeaves,
  allLeaves,
  getDetails,
  updateLeaveStatus,
};
