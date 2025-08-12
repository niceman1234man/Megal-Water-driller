const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  overview: { type: String, required: true },
  mission: { type: String },
  vision: { type: String },
  goals: { type: String },
  licenses: [{
    filename: String,
    url: String,  // path to the uploaded PDF
  }],
}, { timestamps: true });

module.exports = mongoose.model("About", AboutSchema);

