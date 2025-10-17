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

// ✅ Fixed Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let resourceType = "image";

    if (file.mimetype.startsWith("video")) resourceType = "video";
    else if (file.mimetype === "application/pdf") resourceType = "raw";

    return {
      folder: "megal_water_driller",
      resource_type: resourceType, // ✅ key fix
      format: file.mimetype.split("/")[1],
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
      allowed_formats: ["jpg", "png", "jpeg", "mp4", "pdf"],
    };
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // ✅ allow up to 200MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "video/mp4",
      "application/pdf",
    ];
    if (allowedTypes.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Unsupported file format"), false);
  },
});

module.exports = { cloudinary, upload };
