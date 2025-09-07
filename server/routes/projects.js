const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

const { upload } = require("../config/cloudinary"); // import cloudinary upload

// GET all projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD new project
router.post("/projects", upload.single("image"), async (req, res) => {
  try {
    const newProject = new Project({
      ...req.body,
      image: req.file ? req.file.path : "", // Cloudinary gives full URL
    });
    const saved = await newProject.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE project
router.put("/projects/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.path; // Cloudinary URL
    }
    const updated = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ error: "Project not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE project
router.delete("/projects/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
