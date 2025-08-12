const mongoose = require("mongoose");

const EquipmentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true, // e.g. "Laptop", "Printer", "Generator"
    trim: true
  },
  brand: {
    type: String,
    required: true, // e.g. "Dell", "HP", "Canon"
    trim: true
  },
  model: {
    type: String,
    required: true, // e.g. "Latitude 5400"
    trim: true
  },
  year: {
    type: Number, // e.g. 2023
    min: 1900,
    max: new Date().getFullYear()
  },
  unit: {
    type: String, // e.g. "pcs", "sets", "boxes"
    required: true,
    trim: true
  },
  qty: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    default: "",
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Equipment", EquipmentSchema);
