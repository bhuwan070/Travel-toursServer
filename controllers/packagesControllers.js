const Package = require("../models/package");
const getAllPackages = async (req, res) => {
  try {
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

module.exports = { getAllPackages, createPackages };
