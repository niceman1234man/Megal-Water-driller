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

// ✅ UPDATE testimonial
router.put("/:id", upload.single("file"), async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ error: "Not found" });

    // If new file uploaded → delete old one from Cloudinary
    if (req.file) {
      if (testimonial.image) {
        const publicId = testimonial.image
          .split("/")
          .slice(-1)[0]
          .split(".")[0]; // get last part without extension
        await cloudinary.uploader.destroy(`testimonials/${publicId}`, {
          resource_type: "auto",
        });
      }
      testimonial.image = req.file.path; // update with new Cloudinary URL
    }

    // Update text fields
    testimonial.name = req.body.name || testimonial.name;
    testimonial.company = req.body.company || testimonial.company;
    testimonial.comment = req.body.comment || testimonial.comment;

    const updated = await testimonial.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ DELETE testimonial
router.delete("/:id", async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ error: "Not found" });

    if (testimonial.image) {
      const parts = testimonial.image.split("/");
      const fileName = parts.pop(); // e.g. qioynf2xabphhnayjy7a.pdf
      const publicId = fileName.split(".")[0]; // remove .pdf/.jpg
      
      // check extension
      const isPdf = testimonial.image.toLowerCase().endsWith(".pdf");
      const resourceType = isPdf ? "raw" : "image";

      // ✅ adjust the folder name to match your upload
      await cloudinary.uploader.destroy(
        `megal_water_driller/${publicId}`, // folder + publicId
        { resource_type: resourceType }
      );
    }

    await Testimonial.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
