const express = require("express");
const Gallery = require("../models/GallaryImage");
const { upload } = require("../config/cloudinary");
const { cloudinary } = require("../config/cloudinary");
const auth = require("../middleware/auth");

const router = express.Router();

// Get all media
router.get("/", async (req, res) => {
  try {
    const media = await Gallery.find().sort({ createdAt: -1 });
    res.json(media);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add media
router.post("/", auth, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    const { location, client } = req.body;

    const newMedia = new Gallery({
      location,
      client,
      url: req.file.path, // ✅ Cloudinary secure URL
      public_id: req.file.filename || req.file.public_id, // ✅ fallback
    });

    await newMedia.save();
    res.json(newMedia);
  } catch (err) {
    console.error("❌ Create error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Update media
router.put("/:id", auth, upload.single("file"), async (req, res) => {
  try {
    const { location, client } = req.body;

    const existing = await Gallery.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: "Media not found" });
    }

    const updateData = {
      location: location || existing.location,
      client: client || existing.client,
      url: existing.url,
      public_id: existing.public_id,
    };

    if (req.file) {
      // Replace file
      updateData.url = req.file.path;
      updateData.public_id = req.file.filename || req.file.public_id;
    }

    const updated = await Gallery.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("❌ Update error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Delete media
router.delete("/:id", auth, async (req, res) => {
  try {
    const media = await Gallery.findById(req.params.id);
    if (!media) return res.status(404).json({ error: "Media not found" });

    let resourceType = "image";
    if (media.url.endsWith(".mp4")) resourceType = "video";
    if (media.url.endsWith(".pdf")) resourceType = "raw";

    if (media.public_id) {
      await cloudinary.uploader.destroy(media.public_id, {
        resource_type: resourceType,
      });
    }

    await Gallery.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
