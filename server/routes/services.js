const express = require("express");
const router = express.Router();

const Service = require("../models/Service");
const Equipment = require("../models/Equipments");
const Asset = require("../models/Assets");
const auth = require("../middleware/auth");
const { upload, cloudinary } = require("../config/cloudinary"); // ✅ Cloudinary setup

// ----------------- SERVICES -----------------

// GET all services
router.get("/services", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADD new service
router.post("/services",auth, async (req, res) => {
  try {
    const newService = new Service(req.body);
    const saved = await newService.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE service
router.put("/services/:id",auth, async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Service not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE service
router.delete("/services/:id",auth, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single service
router.get("/services/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ----------------- EQUIPMENTS -----------------

// GET all equipments
router.get("/equipments", async (req, res) => {
  try {
    const equipment = await Equipment.find();
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one equipment
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
router.post("/equipments",auth, async (req, res) => {
  try {
    const newEquipment = new Equipment(req.body);
    const saved = await newEquipment.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE equipment
router.put("/equipments/:id",auth, async (req, res) => {
  try {
    const updated = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Equipment not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE equipment
router.delete("/equipments/:id",auth, async (req, res) => {
  try {
    await Equipment.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ----------------- ASSETS -----------------

// GET all assets
router.get("/assets", async (req, res) => {
  try {
    const assets = await Asset.find();
    res.json(assets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD new asset (with Cloudinary image)
router.post("/assets",auth, upload.single("image"), async (req, res) => {
  try {
    const newAsset = new Asset({
      name: req.body.name,
      image: req.file ? req.file.path : null,       // ✅ Cloudinary URL
      public_id: req.file ? req.file.filename : ""  // ✅ Cloudinary public_id
    });

    const saved = await newAsset.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE asset
router.put("/assets/:id",auth, upload.single("image"), async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return res.status(404).json({ error: "Asset not found" });

    asset.name = req.body.name || asset.name;

    if (req.file) {
      // delete old file
      if (asset.public_id) {
        await cloudinary.uploader.destroy(asset.public_id, { resource_type: "image" });
      }
      asset.image = req.file.path;
      asset.public_id = req.file.filename;
    }

    const updated = await asset.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE asset
router.delete("/assets/:id",auth, async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return res.status(404).json({ error: "Asset not found" });

    if (asset.public_id) {
      await cloudinary.uploader.destroy(asset.public_id, { resource_type: "image" });
    }

    await Asset.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
