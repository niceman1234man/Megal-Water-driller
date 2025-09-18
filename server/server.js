// backend/server.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
const mongoose = require("mongoose");
const contactInfoRoutes = require('./routes/contactInfo');
const servicesRoutes = require('./routes/services');
const projectsRoutes = require('./routes/projects');
const galleryRoutes = require('./routes/gallary');
const aboutRoutes = require('./routes/about');
const socialMediaRoutes = require("./routes/socialMedia");
const testimonalRoutes = require("./routes/testimonials");
const contactRoutes = require("./routes/contact");

const dotenv = require("dotenv");
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
// mongoose.connect("mongodb://127.0.0.1:27017/megalDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log("✅ Connected to MongoDB locally"))
// .catch((err) => console.error("❌ MongoDB connection error:", err));

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB online"))
.catch((err) => console.error("❌ MongoDB connection error:", err));


// Middleware
app.use(cors({
  origin: 'https://megal-water-driller.netlify.app', // Adjust this to your frontend URL
  methods: [ 'GET', 'POST', 'PUT', 'DELETE'],
  // credentials: true // Allow credentials if needed
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api',contactInfoRoutes);
app.use('/api',servicesRoutes)
app.use('/api',projectsRoutes);
app.use('/api',galleryRoutes);
app.use('/api',aboutRoutes);
app.use("/api/socialmedia", socialMediaRoutes);
app.use("/api/testimonials", testimonalRoutes);
app.use("/api", contactRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on https://megal-water-driller.netlify.app:${PORT}`);
});
