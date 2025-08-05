const express = require("express");

const {
  getBlogById,
  getAllBlogs,
  createBlogs,
  updateBlog,
} = require("../controllers/blogController");

const router = express.Router();

router.get("/", getAllBlogs);
router.post("/", createBlogs);
router.put("/:id", updateBlog);
router.get("/:id", getBlogById);

module.exports = router;
