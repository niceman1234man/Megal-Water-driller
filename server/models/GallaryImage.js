const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema(
  {
    location: { type: String, required: true, trim: true },
    client: { type: String, required: true, trim: true },
    url: { type: String, required: true }, // Path to image/video file
    public_id:{ type: String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", GallerySchema);
