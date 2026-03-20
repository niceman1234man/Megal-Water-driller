const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage");
const ContactInfo = require("../models/ContactInfo");
const nodemailer = require("nodemailer");
const auth = require("../middleware/auth");
const Message = ContactMessage;
const Contact = ContactInfo;

// ✅ Create transporter (use Gmail or your SMTP service)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your sender email
    pass: process.env.EMAIL_PASS, // app password
  },
});

// 📩 POST - Save message + send email
router.post("/messages", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save to MongoDB
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    // Get admin emails from Contact collection
    const contact = await Contact.findOne();
    const adminEmails = contact?.emails || [];

    if (adminEmails.length > 0) {
      try {
        // Send email to all admins
        await transporter.sendMail({
          from: "Megal Water Driller",
          to: adminEmails.join(","),
          subject: `📩 New Contact Message: ${subject}`,
          text: `
            Name: ${name}
            Email: ${email}
            Subject: ${subject}
            Message: ${message}
          `,
          html: `
            <h3>New Message from Megal Water Driller Website</h3>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Subject:</b> ${subject}</p>
            <p><b>Message:</b> ${message}</p>
          `,
        });
      } catch (emailErr) {
        console.warn("⚠️ Email send failed (message still saved):", emailErr);
      }
    } else {
      console.info("ℹ️ No admin emails configured, skipping notification email.");
    }

    res.status(201).json({ success: true, message: "Message saved successfully." });
  } catch (err) {
    console.error("❌ Error in /messages:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 📥 GET all messages (for Admin Dashboard)
router.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🗑️ DELETE message
router.delete("/messages/:id",auth, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
