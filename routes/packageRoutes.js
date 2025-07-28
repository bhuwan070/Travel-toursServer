const express = require("express");

const {
  getAllPackages,
  createPackages,
  getPackageById,
  updatePackage,
  deletePackage,
  filterPackages,
} = require("../controllers/packagesControllers");

const router = express.Router();

router.get("/", getAllPackages);
router.post("/", createPackages);
router.get("/filter", filterPackages);
router.get("/:id", getPackageById);
router.put("/:id", updatePackage);
router.delete("/:id", deletePackage);

module.exports = router;
