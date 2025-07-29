const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// create new admin
const createAdmin = async (req, res) => {
  console.log("incomming data:", req.body);
  const { email, password } = req.body;
  try {
    const existing = await Admin.findOne({ email });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });
    const savedAdmin = await newAdmin.save();

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: { id: savedAdmin._id, email: savedAdmin.email },
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({
      success: false,
      message: "Error creating admin",
      error: error.message,
    });
  }
};

module.exports = {
  createAdmin,
};
