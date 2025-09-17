const express = require("express");
const Gallery = require("../models/GallaryImage");
const { upload } = require("../config/cloudinary");
const { cloudinary } = require("../config/cloudinary");




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

router.post("/gallery", upload.single("file"), async (req, res) => {
  try {
    console.log("➡️ Body:", req.body);
    console.log("➡️ File:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    const { location, client } = req.body;
    const newMedia = new Gallery({
      location,
      client,
      url: req.file.path,
      public_id: req.file.filename,
    });

    await newMedia.save();
    res.json(newMedia);
  } catch (err) {
    console.error("❌ Create error:", err);
    res.status(500).json({ error: err.message });
  }
});



// Update media
router.put("/gallery/:id", upload.single("file"), async (req, res) => {
  try {
    const { location, client } = req.body;

    // find the existing item
    const existing = await Gallery.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: "Media not found" });
    }

    // prepare update
    const updateData = {
      location: location || existing.location,
      client: client || existing.client,
      url: existing.url,
      public_id: existing.public_id,
    };

    // if new file uploaded, replace with Cloudinary URL
    if (req.file) {
      updateData.url = req.file.path;       // ✅ Cloudinary URL
      updateData.public_id = req.file.filename;
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
router.delete("/gallery/:id", async (req, res) => {
  try {
    const media = await Gallery.findById(req.params.id);
    if (!media) return res.status(404).json({ error: "Media not found" });

    // Determine type based on file extension
    let resourceType = "image";
    if (media.url.endsWith(".mp4")) resourceType = "video";
    if (media.url.endsWith(".pdf")) resourceType = "raw";

    if (media.public_id) {
      await cloudinary.uploader.destroy(media.public_id, { resource_type: resourceType });
    }

    await Gallery.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
