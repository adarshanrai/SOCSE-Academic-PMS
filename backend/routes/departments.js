const express = require("express");
const router = express.Router();
const {
  createDepartment,
  listDepartments,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentsController");

router.get("/", listDepartments);
router.post("/", createDepartment);
router.put("/:id", updateDepartment);
router.delete("/:id", deleteDepartment);

module.exports = router;
