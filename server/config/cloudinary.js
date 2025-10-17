// backend/config/cloudinary.js
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage settings
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let resourceType = "image"; // default

    if (file.mimetype.startsWith("video/")) resourceType = "video";
    if (file.mimetype === "application/pdf") resourceType = "raw";

    return {
      folder: "megal_water_driller",
      resource_type: resourceType,
      allowed_formats: ["jpg", "png", "jpeg", "mp4", "pdf"],
    };
  },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };
