const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { addSalary, getSalary } = require("../controllers/salaryController");

const router = express.Router();
router.post("/add", authMiddleware, addSalary);
router.get("/:id/:role", authMiddleware, getSalary);
module.exports = router;
