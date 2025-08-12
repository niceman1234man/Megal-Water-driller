const express = require("express");
const router = express.Router();
const About = require("../models/About");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/licenses"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// GET full about content
router.get("/", async (req, res) => {
  const about = await About.findOne();
  res.json(about || {
    overview: "",
    mission: "",
    vision: "",
    goals: "",
    licenses: []
  });
});

// UPDATE about fields (without file upload)
router.put("/", auth, async (req, res) => {
  const { overview, mission, vision, goals } = req.body;
  const updated = await About.findOneAndUpdate(
    {},
    { overview, mission, vision, goals },
    { upsert: true, new: true }
  );
  res.json(updated);
});

// POST upload license PDF
router.post("/licenses", auth, upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const fileData = {
    filename: req.file.originalname,
    url: `/uploads/licenses/${req.file.filename}`
  };

  let about = await About.findOne();
  if (!about) about = new About({ licenses: [] });
  about.licenses.push(fileData);
  await about.save();

  res.json(fileData);
});

// DELETE a license PDF by index
router.delete("/licenses/:index", auth, async (req, res) => {
  const { index } = req.params;
  const about = await About.findOne();
  if (!about || !about.licenses[index]) return res.status(404).json({ error: "License not found" });

  about.licenses.splice(index, 1);
  await about.save();

  res.json({ success: true });
});

module.exports = router;
