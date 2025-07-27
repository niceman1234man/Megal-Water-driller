const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  company: String,
  image: String, // optional image (e.g., client photo or logo)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Testimonial", TestimonialSchema);
