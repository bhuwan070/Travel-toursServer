const express = require("express");
const cors = require("cors");
const { default: helmet } = require("helmet");
const packageRoutes = require("./routes/packageRoutes");
const adminRoutes = require("./routes/adminRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

// middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// routes
app.use("/api/packages", packageRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
