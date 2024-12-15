const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  addDepartment,
  getDepartment,
  editDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");

const router = express.Router();
router.post("/add", authMiddleware, addDepartment);
router.get("/", authMiddleware, getDepartment);
router.get("/:id", authMiddleware, editDepartment);
router.put("/:id", authMiddleware, updateDepartment);
router.delete("/:id", authMiddleware, deleteDepartment);

module.exports = router;
