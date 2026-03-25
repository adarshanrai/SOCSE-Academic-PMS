const express = require("express");
const router = express.Router();
const {
  createGroup,
  listGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
} = require("../controllers/groupsController");

router.get("/", listGroups);
router.get("/:id", getGroupById);
router.post("/", createGroup);
router.put("/:id", updateGroup);
router.delete("/:id", deleteGroup);

module.exports = router;
