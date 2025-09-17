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
    public_id: { type: String }, // to store Cloudinary public_id for deletion
    
}, { timestamps: true });
module.exports = mongoose.model("Asset", AssetSchema);
