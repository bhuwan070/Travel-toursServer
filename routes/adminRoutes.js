const express = require("express");

const {
  createAdmin,
  loginAdmin,
  getAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/adminController");

const router = express.Router();

router.post("/create", createAdmin);
router.get("/login", loginAdmin);
router.get("/getadmins", getAdmin);
router.get("/:id", getAdminById);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);
module.exports = router;
