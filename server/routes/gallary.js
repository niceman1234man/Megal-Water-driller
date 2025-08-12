const express = require("express");
const multer = require("multer");
const path = require("path");
const Gallery= require("../models/GallaryImage");

const router = express.Router();

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // uploads folder at project root
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Get all media
router.get("/gallery", async (req, res) => {
  try {
    const media = await Gallery.find().sort({ createdAt: -1 });
    res.json(media);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create media
router.post("/gallery", upload.single("file"), async (req, res) => {
  try {
    const { location, client } = req.body;
    if (!req.file) return res.status(400).json({ error: "File is required" });

    const newMedia = new Gallery({
      location,
      client,
      url: `/uploads/${req.file.filename}`,
    });

    await newMedia.save();
    res.json(newMedia);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update media
router.put("/gallery/:id", upload.single("file"), async (req, res) => {
  try {
    const { location, client } = req.body;
    const updateData = { location, client };

    if (req.file) {
      updateData.url = `/uploads/${req.file.filename}`;
    }

    const updated = await Gallery.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updated) return res.status(404).json({ error: "Media not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete media
router.delete("/gallery/:id", async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
