const mongoose = require("mongoose");

const bolgSchema = new mongoose.Schema({
  title: String,
  company: String,
  type: String,
  date: String,
  discription: String,
  placeName: String,
  placeImage: String,
  placeDiscription: String,
});

module.exports = mongoose.model("blog", bolgSchema);
