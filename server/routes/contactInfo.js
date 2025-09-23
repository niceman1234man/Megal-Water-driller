const express = require("express");
const router = express.Router();
const ContactInfo = require("../models/ContactInfo");
const auth = require("../middleware/auth");
router.get("/contact", async (req, res) => {
  const info = await ContactInfo.findOne();
  console.log(info)
  res.json(info || {});
});

router.put("/contact",auth, async (req, res) => {
 
  const updated = await ContactInfo.findOneAndUpdate({}, req.body, {
    upsert: true,
    new: true,
  });
  res.json(updated);
});


router.get("/contact/email", async (req, res) => {
  // const info = await ContactInfo.findOne();
  res.json("{ email: info ? info.email : }");
});

module.exports = router;
