const express = require("express");

const {
  getAllPackages,
  createPackages,
  getPackageById,
} = require("../controllers/packagesControllers");

const router = express.Router();

router.get("/", getAllPackages);
router.get("/:id", getPackageById);
router.post("/", createPackages);

module.exports = router;
