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
    const { id } = req.params;
    const leaves = await Leave.find({ employeeId: id });
    if (!leaves) {
      const employee = await Employee.findOne({ userId: id });
      leaves = await Leave.find({ employeeId: employee._id });
    }
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.log(error.meaasge);
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
