const express = require("express");
const router = express.Router();
const About = require("../models/About");
const auth = require("../middleware/auth");

// GET about text
router.get("/", async (req, res) => {
  const about = await About.findOne();
  res.json(about || { text: "" });
});

// UPDATE about text
router.put("/", auth, async (req, res) => {
  const updated = await About.findOneAndUpdate(
    {},
    { text: req.body.text },
    { upsert: true, new: true }
  );
  res.json(updated);
});

module.exports = router;
