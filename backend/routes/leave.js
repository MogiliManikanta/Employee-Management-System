const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  addLeave,
  getLeaves,
  allLeaves,
  updateLeaveStatus,
  getDetails,
} = require("../controllers/leaveController");

const router = express.Router();
router.post("/add", authMiddleware, addLeave);
router.get("/:id", authMiddleware, getLeaves);
router.get("/", authMiddleware, allLeaves);
router.get("/detail/:id", authMiddleware, getDetails);
router.put("/:id", authMiddleware, updateLeaveStatus);
module.exports = router;
