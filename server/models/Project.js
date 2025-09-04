const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: { 
      type: String,
       required: true 
      },
    description: String,
    client: String,
    startDate: Date,
    endDate: Date,
    period:Date,
    status: {
      type: String,
      enum: ["ongoing", "completed", "planned"],
      default: "planned",
    },
    percentageOfCompletion: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    budget: Number,
    unit:{
      type: String,
      enum: ["USD", "ETB", "EUR", "GBP", "Other"],
      default: "ETB",
    },
    contractor: {
      type: String,
      enum: ["Prime", "Sub Contractor"],
      default: "Prime",
    },
    acceptance: {
      type: String,
      enum: ["Accepted", "Rejected", "Pending"],
      default: "Pending",
    },
    roleOfBinder:{
      type: String,
      enum: [ "Contractor", "Sub Contractor"],
      default: "Contractor",
    },
    location: String,
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
