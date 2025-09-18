const express = require("express");
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// Example protected dashboard route
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    res.json({ message: `Welcome ${user.email}, this is the Admin Dashboard!` });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
