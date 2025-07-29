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

// login admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password ",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("tooken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { id: admin._id, email: admin.email, token: token },
    });
  } catch (error) {
    console.error("Error loggin in admin:", error);
    res.status(500).json({
      success: false,
      message: "Error logging in admin",
      error: error.message,
    });
  }
};

module.exports = {
  createAdmin,
  loginAdmin,
};
