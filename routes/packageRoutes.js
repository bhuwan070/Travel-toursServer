const express = require("express");

const {
  getAllPackages,
  createPackages,
  getPackageById,
  updatePackage,
} = require("../controllers/packagesControllers");

const router = express.Router();

router.get("/", getAllPackages);
router.get("/:id", getPackageById);
router.post("/", createPackages);
router.put("/:id", updatePackage);
router.delete("/:id", deletePackage);

module.exports = router;
