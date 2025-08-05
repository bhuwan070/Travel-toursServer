const express = require("express");

const {
  getBlogById,
  getAllBlogs,
  createBlogs,
  updateBlog,
  filterBlogs,
  deleteBlogs,
} = require("../controllers/blogController");

const router = express.Router();

router.get("/", getAllBlogs);
router.post("/", createBlogs);
router.get("/filter", filterBlogs);
router.put("/:id", updateBlog);
router.get("/:id", getBlogById);
router.delete("/:id", deleteBlogs);

module.exports = router;
