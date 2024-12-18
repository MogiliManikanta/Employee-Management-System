const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { addLeave, getLeaves } = require("../controllers/leaveController");

const router = express.Router();
router.post("/add", authMiddleware, addLeave);
router.get("/:id", authMiddleware, getLeaves);
module.exports = router;
