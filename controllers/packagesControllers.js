const Package = require("../models/package");
const getAllPackages = async (req, res) => {
  try {
    console.log("Received Body:", req.body);

    const packages = await Package.find();
    res.status(200).json({
      success: true,
      message: "Packages fetched successfully",
      data: packages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching packages",
      error: error.message,
    });
  }
};

const getPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const package = await Package.findById(id);
    if (!package) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Package fetched successfully",
      data: package,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching package",
      error: error.message,
    });
  }
};

const createPackages = async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    const savedPackage = await newPackage.save();
    res.status(201).json({
      success: true,
      message: "Package created successfully",
      data: savedPackage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating package",
      error: error.message,
    });
  }
};

module.exports = { getAllPackages, createPackages, getPackageById };
