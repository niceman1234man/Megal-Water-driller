const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const { upload, cloudinary } = require("../config/cloudinary");
const auth = require("../middleware/auth");

// 🟢 GET all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 ADD new project (with optional image/video)
router.post("/", auth, upload.single("file"), async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      media: req.file
        ? [
            {
              url: req.file.path,
              public_id: req.file.filename,
              type: req.file.mimetype.startsWith("video") ? "video" : "image",
            },
          ]
        : [],
    });
    const saved = await project.save();
    res.json(saved);
  } catch (err) {
    console.error("❌ Project create error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 🟢 ADD new media (image/video) to existing project
router.post("/:id/media", auth, upload.single("file"), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const newMedia = {
      url: req.file.path,
      public_id: req.file.filename,
      type: req.file.mimetype.startsWith("video") ? "video" : "image",
    };

    project.media.push(newMedia);
    const updated = await project.save();
    res.json(updated);
  } catch (err) {
    console.error("❌ Add media error:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE a single media file from project
router.delete("/:id/media/:mediaId", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    const mediaItem = project.media.id(req.params.mediaId);
    if (!mediaItem) return res.status(404).json({ error: "Media not found" });

    console.log("Deleting media:", { mediaId: req.params.mediaId, public_id: mediaItem.public_id, type: mediaItem.type });

    // 🧩 Safe delete (specify resource_type based on actual stored type)
    const resourceType = mediaItem.type === "video" ? "video" : "image";
    const destroyResult = await cloudinary.uploader.destroy(mediaItem.public_id, {
      resource_type: resourceType,
    });

    console.log("Cloudinary destroy result:", destroyResult);

    if (!["ok", "not_found"].includes(destroyResult.result)) {
      console.error("Cloudinary failed to destroy media:", destroyResult);
      return res.status(500).json({ error: "Failed to delete media from Cloudinary" });
    }

    // Remove from project
    project.media = project.media.filter((m) => m._id.toString() !== req.params.mediaId);
    const savedProject = await project.save();
    console.log("Media deleted successfully from project");
    res.json(savedProject);

    console.log("Media deleted successfully from project");
    res.json(project);
  } catch (err) {
    console.error("❌ Delete media error:", err);
    res.status(500).json({ error: err.message });
  }
});


// 🟢 UPDATE basic project info (without touching media)
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    console.error("❌ Update project error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 🟢 DELETE entire project
router.delete("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    for (const media of project.media) {
      await cloudinary.uploader.destroy(media.public_id, {
        resource_type: media.type === "video" ? "video" : "image",
      });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    console.error("❌ Delete project error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
