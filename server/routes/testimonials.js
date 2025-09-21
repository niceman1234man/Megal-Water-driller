const express = require("express");
const router = express.Router();
const Testimonial = require("../models/Testimonial");
const { upload } = require("../config/cloudinary");
const { cloudinary } = require("../config/cloudinary");



// ✅ GET all testimonials
router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ ADD testimonial (image/pdf upload to Cloudinary)
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const newTestimonial = new Testimonial({
      name: req.body.name,
      company: req.body.company,
      comment: req.body.comment,
      image: req.file ? req.file.path : "", // Cloudinary gives full URL
    });

    const saved = await newTestimonial.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE testimonial
router.delete("/:id", async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ error: "Not found" });

    // Delete file from Cloudinary if exists
    if (testimonial.image) {
      const publicId = testimonial.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`testimonials/${publicId}`, {
        resource_type: "auto",
      });
    }

    await Testimonial.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
