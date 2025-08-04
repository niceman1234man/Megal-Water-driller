// backend/server.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample services data
const equipments=[
                      {
                        id: 1,
                        type: "Drilling Rig",
                        brand: "CRM",
                        model: "800",
                        year: 2012,
                        unit: "pcs",
                        qty: 1,
                        description: "Hydraulic rig top head drive with 45 Tons pull up capacity...",
                      },
                      {
                        id: 2,
                        type: "Mud pump",
                        brand: "Ballerini",
                        model: "7x8",
                        year: 2012,
                        unit: "pcs",
                        qty: 1,
                        description: "Duplex mud pump with max capacity 1,560 l/min at 20 bar...",
                      },
                      {
                        id: 3,
                        type: "Portable Air Compressor",
                        brand: "Atlas Copco",
                        model: "XRVS 450",
                        year: 1991,
                        unit: "pcs",
                        qty: 1,
                        description: "Capacity of 25,000 l/min and 28 bar pressure...",
                      },
                      {
                        id: 4, // ✅ Fixed duplicate ID
                        type: "Foam Injector",
                        brand: "",
                        model: "",
                        year: 2012,
                        unit: "pcs",
                        qty: 1,
                        description: "Foam pump, mounted on the rig, hydraulically connected...",
                      },
                      {
                        id: 5,
                        type: "Truck with crane",
                        brand: "Iveco / Fassi",
                        model: "Magirus 256 D26 / F300",
                        year: 2010,
                        unit: "pcs",
                        qty: 1,
                        description: "Dump truck with 8 m³ tipper and crane Fassi F300...",
                      },
                      // ... rest of items
                    ]
const services = [
  {
    id: 1,
    title: "Deep Water Well Drilling",
    description: "Reliable deep borehole drilling using modern rotary and DTH equipment.",
    icon: "💧",
  },
  {
    id: 2,
    title: "Pump Installation",
    description: "Installation of electric and manual pumps for residential, agricultural, and industrial use.",
    icon: "🔩",
  },
  {
    id: 3,
    title: "Hydrogeological Survey",
    description: "Site investigation and groundwater assessment by licensed hydrogeologists.",
    icon: "🌍",
  },
  {
    id: 4,
    title: "Test Pumping & Yield Analysis",
    description: "We perform step-drawdown and constant rate tests to measure water yield.",
    icon: "📈",
  },
  {
    id: 5,
    title: "Borehole Maintenance",
    description: "Rehabilitation, deepening, or cleaning of existing water wells.",
    icon: "🛠️",
  },
  {
    id: 6,
    title: "Water System Design",
    description: "Turn-key design and planning for complete water supply systems.",
    icon: "🧩",
  },
];


const projects = [
  {
    id: 1,
    title: "Borehole Drilling at Bahir Dar University",
    description: "A 180-meter deep borehole providing clean water to over 5,000 students and staff.",
    location: "Bahir Dar, Ethiopia",
    image: "project1"
  },
  {
    id: 2,
    title: "Agricultural Well for Commercial Farm",
    description: "Installed high-capacity pump and filtration system for irrigation use.",
    location: "Hawassa, Ethiopia",
    image: "project2"
  },
  {
    id: 3,
    title: "Rural Water Supply Program",
    description: "20 boreholes drilled across villages with solar-powered pump systems.",
    location: "Oromia Region",
    image: "project3"
  },
  {
    id: 4,
    title: "Government Health Center Water System",
    description: "Designed and constructed clean water system for a new clinic.",
    location: "Addis Ababa",
    image: "project4"
  }
];

// API route
app.get('/api/services', (req, res) => {
  res.json(services);
});
app.get('/api/equipments', (req, res) => {
  res.json(equipments);
});
app.get('/api/projects', (req, res) => {
  res.json(projects);
});



// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
