const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  updateEmployee,
  //   deleteDepartment,
} = require("../controllers/employeeController");

const router = express.Router();
router.post("/add", authMiddleware, upload.single("image"), addEmployee);
router.get("/", authMiddleware, getEmployees);
router.get("/:id", authMiddleware, getEmployee);
router.put("/:id", authMiddleware, updateEmployee);
// router.delete("/:id", authMiddleware, deleteDepartment);

module.exports = router;
