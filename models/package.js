const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  title: String,
  price: Number,
  discount: Number,
  description: String,
  isActive: Boolean,
  country: String,
  places: [String],
  duration: String,
  image: String,
});

module.exports = mongoose.model("package", packageSchema);
