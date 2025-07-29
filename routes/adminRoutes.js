const express = require("express");

const {
  createAdmin,
  loginAdmin,
  getAdmin,
  getAdminById,
  updateAdmin,
} = require("../controllers/adminController");

const router = express.Router();

router.post("/create", createAdmin);
router.get("/login", loginAdmin);
router.get("/getadmins", getAdmin);
router.get("/:id", getAdminById);
router.put("/:id", updateAdmin);
module.exports = router;
