const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getSummary } = require("../controllers/dashboardController");

const router = express.Router();
router.get("/summary", authMiddleware, getSummary);
// router.get("/:id", authMiddleware, getSalary);
module.exports = router;
