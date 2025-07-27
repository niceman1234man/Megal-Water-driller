const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// GET all projects
router.get("/", async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

// ADD new project
router.post("/", auth, upload.single("image"), async (req, res) => {
  const newProject = new Project({
    ...req.body,
    image: req.file ? `/uploads/${req.file.filename}` : "",
  });
  const saved = await newProject.save();
  res.json(saved);
});

// DELETE project
router.delete("/:id", auth, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
