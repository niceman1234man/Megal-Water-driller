const mongoose = require("mongoose");
const AssetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // e.g. "Vehicle", "Furniture", "Electronics"
    trim: true
    },
    image: {
    type: String, // URL or path to the asset image
    required: true,
    trim: true
    },
}, { timestamps: true });
module.exports = mongoose.model("Asset", AssetSchema);
