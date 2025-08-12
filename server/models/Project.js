const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  location: String,
  image: String, // path to uploaded image

} ,{ timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
