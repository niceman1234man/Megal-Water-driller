const express = require("express");
const router = express.Router();
const Testimonial = require("../models/Testimonial");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// GET all testimonials
router.get("/", async (req, res) => {
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  res.json(testimonials);
});

// ADD testimonial
router.post("/", auth, upload.single("image"), async (req, res) => {
  const newTestimonial = new Testimonial({
    ...req.body,
    image: req.file ? `/uploads/${req.file.filename}` : "",
  });
  const saved = await newTestimonial.save();
  res.json(saved);
});

// DELETE testimonial
router.delete("/:id", auth, async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
