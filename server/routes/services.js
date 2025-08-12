const express = require("express");
const router = express.Router();
const Service = require("../models/Service");
const Equipment = require("../models/Equipments");
const Asset = require("../models/Assets");
const multer = require("multer");
const path = require("path");

// GET all services
router.get("/services", async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

// ADD new service
router.post("/services", async (req, res) => {
  const newService = new Service(req.body);
  const saved = await newService.save();
  res.json(saved);
});

// UPDATE service by ID
router.put("/services/:id", async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Service not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE service by ID
router.delete("/services/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/services/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// GET all equipment
router.get("/equipments", async (req, res) => {
  const equipment = await Equipment.find();
  res.json(equipment);
});

// GET one equipment by ID
router.get("/equipments/:id", async (req, res) => {
  try {
    const eq = await Equipment.findById(req.params.id);
    if (!eq) return res.status(404).json({ message: "Equipment not found" });
    res.json(eq);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADD new equipment
router.post("/equipments", async (req, res) => {
  try {
    const newEquipment = new Equipment(req.body);
    const saved = await newEquipment.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE equipment by ID
router.put("/equipments/:id", async (req, res) => {
  try {
    const updated = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Equipment not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE equipment by ID
router.delete("/equipments/:id", async (req, res) => {
  try {
    await Equipment.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// File upload setup (uploads/ folder)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure uploads folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  }
});

const upload = multer({ storage: storage });

/**
 * @route   GET /api/assets
 * @desc    Get all assets
 */
router.get("/assets", async (req, res) => {
  try {
    const assets = await Asset.find();
    res.json(assets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   POST /api/assets
 * @desc    Add new asset (with image)
 */
router.post("/assets", upload.single("image"), async (req, res) => {
  try {
    const newAsset = new Asset({
      name: req.body.name,
      image: req.file ? `/uploads/${req.file.filename}` : null
    });

    const saved = await newAsset.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @route   PUT /api/assets/:id
 * @desc    Update asset (optionally with new image)
 */
router.put("/assets/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name
    };
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Asset.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @route   DELETE /api/assets/:id
 * @desc    Delete asset
 */
router.delete("/assets/:id", async (req, res) => {
  try {
    await Asset.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



module.exports = router;
