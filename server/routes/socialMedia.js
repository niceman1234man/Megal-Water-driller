const express = require("express");
const router = express.Router();
const SocialMedia = require("../models/SocialMedia");
const auth = require("../middleware/auth");
// GET all social media links
router.get("/", async (req, res) => {
  const links = await SocialMedia.find();
  res.json(links);
});

// POST new social media link
router.post("/",auth, async (req, res) => {
  try {
    const { platform, link } = req.body;
    if (!platform || !link) return res.status(400).json({ error: "Platform and link are required" });

    const newLink = new SocialMedia({ platform, link });
    const saved = await newLink.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to save social media link" });
  }
});

// PUT update existing social media link
router.put("/:id",auth, async (req, res) => {
  try {
    const { platform, link } = req.body;

    const updated = await SocialMedia.findByIdAndUpdate(
      req.params.id,
      { platform, link },
      { new: true } // return updated document
    );

    if (!updated) {
      return res.status(404).json({ message: "Social media link not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// DELETE a social media link
router.delete("/:id",auth, async (req, res) => {
  try {
  
    await SocialMedia.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch {
    res.status(500).json({ error: "Failed to delete link" });
  }
});

module.exports = router;
