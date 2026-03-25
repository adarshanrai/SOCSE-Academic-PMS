const express = require("express");
const router = express.Router();
const {
  createNews,
  getNews,
  getNewsById,
  updateNews,
  deleteNews,
} = require("../controllers/newsController");

router.get("/", getNews);
router.get("/:id", getNewsById);
router.post("/", createNews);
router.put("/:id", updateNews);
router.delete("/:id", deleteNews);

module.exports = router;
