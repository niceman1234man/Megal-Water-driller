const express = require("express");
const Gallery = require("../models/GallaryImage");
const { upload } = require("../config/cloudinary");

const router = express.Router();

// Get all media
router.get("/gallery", async (req, res) => {
  try {
    const media = await Gallery.find().sort({ createdAt: -1 });
    res.json(media);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create media (Upload to Cloudinary)
router.post("/gallery", upload.single("file"), async (req, res) => {
  try {
    const { location, client } = req.body;
    if (!req.file) return res.status(400).json({ error: "File is required" });

    const newMedia = new Gallery({
      location,
      client,
      url: req.file.path, // ✅ multer-storage-cloudinary gives Cloudinary URL here
      public_id: req.file.filename, // optional: keep Cloudinary public_id for deletion
    });

    await newMedia.save();
    res.json(newMedia);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Update media (Upload new file to Cloudinary if exists)
router.put("/gallery/:id", upload.single("file"), async (req, res) => {
  try {
    const { location, client } = req.body;
    const updateData = { location, client };

    if (req.file) {
      updateData.url = req.file.path;        // Cloudinary secure URL
      updateData.public_id = req.file.filename; // Cloudinary public_id
    }

    const updated = await Gallery.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Media not found" });

    res.json(updated);
  } catch (err) {
    console.error(err);
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
