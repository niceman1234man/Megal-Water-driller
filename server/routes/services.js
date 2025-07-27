const express = require("express");
const router = express.Router();
const Service = require("../models/Service");
const auth = require("../middleware/auth");

// GET all services
router.get("/", async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

// ADD new service
router.post("/", auth, async (req, res) => {
  const newService = new Service(req.body);
  const saved = await newService.save();
  res.json(saved);
});

// DELETE service
router.delete("/:id", auth, async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});
