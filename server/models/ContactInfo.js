const mongoose = require("mongoose");

const ContactInfoSchema = new mongoose.Schema({
  phones: [String],
  emails: [String],
  address: String,
  mapLink: String,
});

module.exports = mongoose.model("ContactInfo", ContactInfoSchema);
