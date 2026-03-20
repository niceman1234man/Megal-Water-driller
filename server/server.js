// backend/server.js

const express = require('express');
const cors = require('cors');
const path = require("path");
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');
const contactInfoRoutes = require('./routes/contactInfo');
const servicesRoutes = require('./routes/services');
const projectsRoutes = require('./routes/projects');
const galleryRoutes = require('./routes/gallary');
const aboutRoutes = require('./routes/about');
const socialMediaRoutes = require("./routes/socialMedia");
const testimonalRoutes = require("./routes/testimonials");
const contactRoutes = require("./routes/contact");
const authRoutes = require("./routes/auth");

const dotenv = require("dotenv");
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
console.log("MONGO_URI:", process.env.MONGO_URI);
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB online"))
.catch((err) => console.error("❌ MongoDB connection error:", err));


// Middleware
app.use(cors({
  origin: 'https://megal-water-driller.netlify.app', 
  methods: [ 'GET', 'POST', 'PUT', 'DELETE'],
  
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api',contactInfoRoutes);
app.use('/api',servicesRoutes)
app.use('/api/projects',projectsRoutes);
app.use('/api/gallery',galleryRoutes);
app.use('/api',aboutRoutes);
app.use("/api/socialmedia", socialMediaRoutes);
app.use("/api/testimonials", testimonalRoutes);
app.use("/api", contactRoutes);
app.use("/api/auth", authRoutes);
// Start server
app.listen(PORT, () => {
  console.log(`Server running on https://megal-water-driller.netlify.app:${PORT}`);
});
