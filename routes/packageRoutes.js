const express = require("express");

const {
  getAllPackages,
  createPackages,
} = require("../controllers/packagesControllers");

const router = express.Router();

router.get("/", getAllPackages);
router.post("/", createPackages);

module.exports = router;
