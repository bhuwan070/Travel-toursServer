const Package = require("../models/package");
const getAllPackages = async (req, res) => {
  try {
    console.log("incomming data:", req.body);

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

const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = await req.body;

    const updatedPackage = await Package.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPackage) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Package updated successfullu",
      data: updatedPackage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating package",
      error: error.message,
    });
  }
};

const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPackage = await Package.findByIdAndDelete(id);

    if (!deletedPackage) {
      return res.status(404).json({
        success: false,
        message: "Package Not Found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Package deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting package",
      error: error.message,
    });
  }
};

const filterPackages = async (req, res) => {
  try {
    const { country, maxPrice, duration, isActive } = req.query;
    const filter = {};

    if (country) filter.country = country;
    if (maxPrice) filter.price = { $lte: Number(maxPrice) };
    if (duration) filter.duration = duration;
    if (isActive) filter.isActive = isActive === "true";

    const packages = await Package.find(filter);

    res.status(200).json({
      success: true,
      message: "Filtered Packages fetched successfully",
      data: packages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching filtered packages",
      error: error.message,
    });
  }
};

module.exports = {
  getAllPackages,
  createPackages,
  getPackageById,
  updatePackage,
  deletePackage,
  filterPackages,
};
