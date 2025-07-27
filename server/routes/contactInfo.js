const express = require("express");
const router = express.Router();
const ContactInfo = require("../models/ContactInfo");
const auth = require("../middleware/auth");

// GET contact info
router.get("/", async (req, res) => {
  const info = await ContactInfo.findOne();
  res.json(info || {});
});

// UPDATE or CREATE contact info
router.put("/", auth, async (req, res) => {
  const updated = await ContactInfo.findOneAndUpdate({}, req.body, {
    upsert: true,
    new: true,
  });
  res.json(updated);
});

module.exports = router;
