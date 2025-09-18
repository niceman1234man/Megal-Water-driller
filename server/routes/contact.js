const express = require("express");
const nodemailer = require("nodemailer");
const ContactMessage = require("../models/ContactMessage");
const ContactInfo = require("../models/ContactInfo");

const router = express.Router();



const Message = ContactMessage;

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // 1️⃣ Save the message in DB
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    // 2️⃣ Fetch admin emails from ContactInfo collection
    const contactInfo = await ContactInfo.findOne();
    if (!contactInfo || !contactInfo.email || contactInfo.email.length === 0) {
      return res.status(500).json({ error: "No admin emails configured" });
    }

    // 3️⃣ Setup nodemailer transport (using Gmail as example)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your app password
      },
    });

    // 4️⃣ Mail options
    const mailOptions = {
      from: `"Megal Water Driller Contact Form" <${process.env.EMAIL_USER}>`,
      to: contactInfo.adminEmails, // send to multiple admins
      subject: `📩 New Contact Message: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message:
        ${message}
      `,
      html: `
        <h2>📩 New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // 5️⃣ Send email
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Message sent and saved successfully!" });
  } catch (err) {
    console.error("❌ Contact error:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
});

module.exports = router;


// 📋 Get all messages (admin dashboard)
router.get("/contact", async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Message.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.json({ success: true, message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
