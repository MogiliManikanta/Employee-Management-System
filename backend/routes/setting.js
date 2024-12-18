const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { ChangePassword } = require("../controllers/settingController");

const router = express.Router();
router.put("/change-password", authMiddleware, ChangePassword);
// router.get("/:id", authMiddleware, getSalary);
module.exports = router;
