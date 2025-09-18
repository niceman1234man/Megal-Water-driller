const express = require("express");
const router = express.Router();
const About = require("../models/About");
const { upload } = require("../config/cloudinary"); // use cloudinary storage

// ✅ GET full about content
router.get("/about", async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(
      about || {
        overview: "",
        mission: "",
        vision: "",
        goals: "",
        licenses: [],
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE about fields (overview, mission, vision, goals)
router.put("/about", async (req, res) => {
  try {
    const { overview, mission, vision, goals } = req.body;
    const updated = await About.findOneAndUpdate(
      {},
      { overview, mission, vision, goals },
      { upsert: true, new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPLOAD a new license (PDF/image)
router.post("/about/license", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const fileData = {
      filename: req.file.originalname,
      url: req.file.path, // Cloudinary URL
      public_id: req.file.filename, // Cloudinary public_id
    };

    let about = await About.findOne();
    if (!about) about = new About({ licenses: [] });

    about.licenses.push(fileData);
    await about.save();

    res.status(201).json(fileData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE a license by license ID
router.delete("/about/license/:licenseId", async (req, res) => {
  try {
    const { licenseId } = req.params;
    const about = await About.findOne();
    if (!about) return res.status(404).json({ error: "About not found" });

    // find license
    const licenseIndex = about.licenses.findIndex((l) => l._id.toString() === licenseId);
    if (licenseIndex === -1) return res.status(404).json({ error: "License not found" });

    // remove from cloudinary if stored
    if (about.licenses[licenseIndex].public_id) {
      const { cloudinary } = require("../config/cloudinary");
      await cloudinary.uploader.destroy(about.licenses[licenseIndex].public_id, { resource_type: "raw" });
    }

    // remove from db
    about.licenses.splice(licenseIndex, 1);
    await about.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
