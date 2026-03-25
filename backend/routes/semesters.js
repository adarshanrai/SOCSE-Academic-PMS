const express = require("express");
const router = express.Router();
const {
  createSemester,
  listSemesters,
  updateSemester,
  deleteSemester,
} = require("../controllers/semestersController");

router.get("/", listSemesters);
router.post("/", createSemester);
router.put("/:id", updateSemester);
router.delete("/:id", deleteSemester);

module.exports = router;
