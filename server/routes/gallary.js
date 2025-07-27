const express = require("express");
const router = express.Router();
const GalleryImage = require("../models/GalleryImage");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// GET all images
router.get("/", async (req, res) => {
  const images = await GalleryImage.find().sort({ uploadedAt: -1 });
  res.json(images);
});

// UPLOAD image
router.post("/", auth, upload.single("image"), async (req, res) => {
  const newImage = new GalleryImage({
    filename: req.file.filename,
    url: `/uploads/${req.file.filename}`,
  });
  const saved = await newImage.save();
  res.json(saved);
});

// DELETE image
router.delete("/:id", auth, async (req, res) => {
  await GalleryImage.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
