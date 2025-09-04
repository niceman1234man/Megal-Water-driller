const mongoose = require("mongoose");

const SocialMediaSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    trim: true
  },
  link: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model("SocialMedia", SocialMediaSchema);
