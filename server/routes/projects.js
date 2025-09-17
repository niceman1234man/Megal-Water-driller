const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const { upload, cloudinary } = require("../config/cloudinary"); // import cloudinary + upload

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
      image: req.file ? req.file.path : "",       // ✅ Cloudinary URL
      public_id: req.file ? req.file.filename : "" // ✅ Cloudinary public_id
    });

    const saved = await newProject.save();
    res.json(saved);
  } catch (err) {
    console.error("❌ Project create error:", err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE project
router.put("/projects/:id", upload.single("image"), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    // If new image uploaded, delete old one from Cloudinary
    if (req.file) {
      if (project.public_id) {
        await cloudinary.uploader.destroy(project.public_id, { resource_type: "image" });
      }
      project.image = req.file.path;       // ✅ new Cloudinary URL
      project.public_id = req.file.filename; // ✅ new Cloudinary public_id
    }

    // Update other fields
    project.title = req.body.title || project.title;
    project.description = req.body.description || project.description;
    project.location = req.body.location || project.location;

    const updated = await project.save();
    res.json(updated);
  } catch (err) {
    console.error("❌ Project update error:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE project
router.delete("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    // Delete image from Cloudinary
    if (project.public_id) {
      await cloudinary.uploader.destroy(project.public_id, { resource_type: "image" });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    console.error("❌ Project delete error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
