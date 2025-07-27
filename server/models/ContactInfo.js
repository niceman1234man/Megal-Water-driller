const mongoose = require("mongoose");

const ContactInfoSchema = new mongoose.Schema({
  phone: String,
  email: String,
  address: String,
  mapLink: String
});

module.exports = mongoose.model("ContactInfo", ContactInfoSchema);
