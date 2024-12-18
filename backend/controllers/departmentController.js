const Department = require("../models/Department");

const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;

    // Validation
    if (!dep_name) {
      return res
        .status(400)
        .json({ success: false, error: "Department name is required" });
    }

    const newDep = new Department({
      dep_name,
      description,
    });
    await newDep.save();
    return res.status(200).json({ success: true, department: newDep });
  } catch (error) {
    console.error(error); // Log the error
    return res
      .status(500)
      .json({ success: false, error: "add department server error" });
  }
};

const getDepartment = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments }); // Updated key
  } catch (error) {
    console.error(error); // Log the error
    return res
      .status(500)
      .json({ success: false, error: "get department server error" });
  }
};

const editDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById({ _id: id });
    return res.status(200).json({ success: true, department });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Get Department server error" });
  }
};
const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;
    const updateDep = await Department.findByIdAndUpdate(
      { _id: id },
      {
        dep_name,
        description,
      }
    );
    return res.status(200).json({ success: true, updateDep });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Update Department server error" });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete department by ID
    const deleteDep = await Department.findById({ _id: id });
    await deleteDep.deleteOne();

    if (!deleteDep) {
      return res
        .status(404)
        .json({ success: false, error: "Department not found" });
    }

    return res.status(200).json({ success: true, deleteDep });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Delete Department server error" });
  }
};

module.exports = {
  editDepartment,
  deleteDepartment,
  addDepartment,
  getDepartment,
  updateDepartment,
};
