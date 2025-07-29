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
        status: false,
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
      status: true,
      message: "Admin created statusfully",
      data: { id: savedAdmin._id, email: savedAdmin.email },
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({
      status: false,
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
        status: false,
        message: "Invalid email or password ",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({
        status: false,
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
      status: true,
      message: "Login statusful",
      data: { id: admin._id, email: admin.email, token: token },
    });
  } catch (error) {
    console.error("Error loggin in admin:", error);
    res.status(500).json({
      status: false,
      message: "Error logging in admin",
      error: error.message,
    });
  }
};

const getAdmin = async (req, res) => {
  try {
    const admins = await Admin.find({}, { _id: 1, email: 1 });
    res.status(200).json({
      status: true,
      data: admins,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "failed to get admins",
      error: error.message,
    });
  }
};

const getAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findById(id, { _id: 1, email: 1 });
    if (!admin) {
      res.status(404).json({
        status: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      status: true,
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to get admin",
      error: error.message,
    });
  }
};

// update admin data
const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  try {
    if (!email && !password) {
      return res.status(400).json({
        status: false,
        message: "Nothing to update - email or password must be provided",
      });
    }

    const updateFields = {};

    if (email) updateFields.email = email;
    if (password) {
      updateFields.password = await bcrypt.hash(password, 10);
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedAdmin) {
      return res.status(404).json({
        status: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      status: true,
      data: { id: updatedAdmin._id, email: updatedAdmin.email },
      message: "Admin updated successfully !",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to update Admin ",
      error: error.message,
    });
  }
};

// delete admin
const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    await Admin.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Admin deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to delete admin",
    });
  }
};

module.exports = {
  createAdmin,
  loginAdmin,
  getAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
