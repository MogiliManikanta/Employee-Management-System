const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  addEmployee,
  upload,
  //   getDepartment,
  //   editDepartment,
  //   updateDepartment,
  //   deleteDepartment,
} = require("../controllers/employeeController");

const router = express.Router();
router.post("/add", authMiddleware, upload.single("image"), addEmployee);
// router.get("/", authMiddleware, getDepartment);
// router.get("/:id", authMiddleware, editDepartment);
// router.put("/:id", authMiddleware, updateDepartment);
// router.delete("/:id", authMiddleware, deleteDepartment);

module.exports = router;
