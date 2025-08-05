const express = require("express");

const {
  getBlogById,
  getAllBlogs,
  createBlogs,
} = require("../controllers/blogController");

const router = express.Router();

router.get("/", getAllBlogs);
router.post("/", createBlogs);
router.get("/:id", getBlogById);

module.exports = router;
