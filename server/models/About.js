const mongoose = require("mongoose");

const LicenseSchema = new mongoose.Schema(
  {
    filename: String,
    url: String,
    public_id: String,
  },
  { timestamps: true }
);

const AboutSchema = new mongoose.Schema(
  {
    overview: { type: String, default: "" },
    mission: { type: String, default: "" },
    vision: { type: String, default: "" },
    goals: { type: String, default: "" },
    licenses: [LicenseSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", AboutSchema);
