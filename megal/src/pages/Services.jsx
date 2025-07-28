import React from "react";
// Update the path if needed
import rig from "../assets/rig.jpg"
import loader from "../assets/loader.jpg"
import compressor from "../assets/compressor.jpg"
import park from "../assets/park.jpg"
const Services = () => {
  const services2 = [
    {
      id: 1,
      title: "Deep Water Well Drilling",
      description:
        "Reliable deep borehole drilling using modern rotary and DTH equipment.",
      icon: "💧",
    },
    {
      id: 2,
      title: "Pump Installation",
      description:
        "Installation of electric and manual pumps for residential, agricultural, and industrial use.",
      icon: "🔩",
    },
    {
      id: 3,
      title: "Hydrogeological Survey",
      description:
        "Site investigation and groundwater assessment by licensed hydrogeologists.",
      icon: "🌍",
    },
    {
      id: 4,
      title: "Test Pumping & Yield Analysis",
      description:
        "We perform step-drawdown and constant rate tests to measure water yield.",
      icon: "📈",
    },
    {
      id: 5,
      title: "Borehole Maintenance",
      description:
        "Rehabilitation, deepening, or cleaning of existing water wells.",
      icon: "🛠️",
    },
    {
      id: 6,
      title: "Water System Design",
      description:
        "Turn-key design and planning for complete water supply systems.",
      icon: "🧩",
    },
  ];

  return (
    <section className="bg-white text-white py-0">
      <div className="">
        {/* Header */}
        <section className="h-screen  bg-blue-800 text-white flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Our Services</h1>
            <p className="text-white max-w-2xl mx-auto text-lg">
              We deliver professional and sustainable water well drilling
              solutions tailored to your needs.
            </p>
          </div>
          <a
            href="#projectsList"
            className="absolute bottom-8 animate-bounce text-white text-3xl"
            aria-label="Scroll Down"
          >
            ⬇️
          </a>
        </section>
        <div className="max-w-7xl mx-auto py-4">
          {/* Service Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services2.map((service) => (
              <div
                key={service.id}
                className="bg-blue-50 border shadow rounded-lg p-6 hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4 text-blue-700">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-800">
                  {service.title}
                </h3>
                <p className="text-gray-700">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-black text-center py-6">
            <h1 className="text-4xl font-bold">Our Assets </h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="py-2 text-2xl">Trucks</h3>
                <img src={park} alt="trucks" />
              </div>
              <div>
                <h3 className="py-2 text-2xl">Rig</h3>
                <img src={rig} alt="Rig" />
              </div>
              <div>
                <h3 className="py-2 text-2xl">Loader</h3>
                <img src={loader} alt="loader" />
              </div>
              <div>
                <h3 className="py-2 text-2xl">Compressor</h3>
                <img src={compressor} alt="compressor" />
              </div>
            </div>
           <section className="p-6 bg-white text-blue-900 max-w-7xl mx-auto">
  <h2 className="text-2xl font-bold mb-6">The Company’s Equipment</h2>

  <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-300 text-sm text-left">
      <thead className="bg-blue-800 text-white">
        <tr>
          <th className="px-4 py-2 border">#</th>
          <th className="px-4 py-2 border">Equipment Type</th>
          <th className="px-4 py-2 border">Brand</th>
          <th className="px-4 py-2 border">Model</th>
          <th className="px-4 py-2 border">Year</th>
          <th className="px-4 py-2 border">Unit</th>
          <th className="px-4 py-2 border">Qty</th>
          <th className="px-4 py-2 border">Description</th>
        </tr>
      </thead>
      <tbody className="text-gray-800">
        {[
          {
            id: 1,
            type: "Drilling Rig",
            brand: "CRM ",
            model: "800 ",
            year: 2012,
            unit: "pcs",
            qty: 1,
            description: "Hydraulic rig top head drive with 45 Tons pull up capacity, 2.200 kgm top head torque. Diesel engine VM 8 cilinders 360 hp, capable to drill 800 meters with 12 drilling dimete. Rig mounted on Astra truck BM 20."
          },
          {
            id: 2,
            type: "Mud pump ",
            brand: "Ballerini",
            model: "7x8",
            year: 2012,
            unit: "pcs",
            qty: 1,
            description: "Duplex mud pump with maximum capacity of 1.560 l/min at 20 bar pressure. The mud pump is mounted on the rig. "
          },
          {
            id: 3,
            type: "Portable Air Compressor ",
            brand: "Atlas Copco ",
            model: "XRVS 450 ",
            year: 1991,
            unit: "pcs",
            qty: 1,
            description: "Portable air compressor with capacity of 25.000 l/min and 28 bar pressure. 10 cilinders diesel engine Deutz  air cooled. 2 Air hose lenght 17,5 meters and 1 air hose lenght 20 meters "
          },
          {
            id: 3,
            type: "Portable Air Compressor ",
            brand: "Atlas Copco ",
            model: "XRVS 450 ",
            year: 1991,
            unit: "pcs",
            qty: 1,
            description: "Portable air compressor with capacity of 25.000 l/min and 28 bar pressure. 10 cilinders diesel engine Deutz  air cooled. 2 Air hose lenght 17,5 meters and 1 air hose lenght 20 meters "
          },
          {
            id: 4,
            type: "Foam Injector",
            brand: " ",
            model: " ",
            year: 2012,
            unit: "pcs",
            qty: 1,
            description: "Foam pump, mounted on the rig, hydraulicaly connected, 80 l/min at 50 bar pressur"
          },{
            id: 5,
            type: "Truck with crane  ",
            brand: "Iveco / Fassi  ",
            model: "Magirus 256 D26 / F300  ",
            year: 2010,
            unit: "pcs",
            qty: 1,
            description: "Dump truck Iveco Magirus 256 D26 with 8 m3 tipper three axels 6x6. Crane Fassi F300 mounted on the truck. Max crane capacity 13 Tons and max lenght 11,5 meters lenght. "
          },{
            id: 6,
            type: "Backhoe Loader  ",
            brand: "Ford  ",
            model: "Transit",
            year: 2008,
            unit: "pcs",
            qty: 1,
            description: "Dump truck Ford 95 hp two axels with 1,5 Ton tipper capacity and six seats inside to carry people  "
          },
          {
            id: 8,
            type: "Service Truck  ",
            brand: "Iveco  ",
            model: "Daily",
            year: 2010,
            unit: "pcs",
            qty: 1,
            description: "Iveco truck two axels equipped with all the necessary to maintain the equipment in the site  "
          },
          {
            id: 9,
            type: "Drill Pipe   ",
            brand: "  ",
            model: "CX",
            year: 2012,
            unit: "m",
            qty: 600,
            description: "100 pcs 5 drill pipe 6 meters lenght each. ID 110 mm OD 127 mm. Ex petroleum drill pipe with friction welded trade 4.5 IF. "
          },{
            id: 10,
            type: "Drill Collar    ",
            brand: "  ",
            model: "",
            year: 2012,
            unit: "pcs",
            qty: 1,
            description: "8 drill collar with 17 stabilizers, lenght 6 meters, weight 2,5 Tons. Bottom trade 7 5/8 Api regular and top trade 4.5 IF Standard back excavator boom, with max digging depth of 4,2 meters. "
          },{
            id: 11,
            type: "Stabilizers   ",
            brand: "JB  ",
            model: "",
            year: 2016,
            unit: "pcs",
            qty: 2,
            description: "22 stabilizers, 3 meters each, bottom trade 7 5/8 Api regular and top trade 3.5 Api regular   "
          }
        ].map((item, index) => (
          <tr key={item.id} className="hover:bg-blue-50">
            <td className="border px-4 py-2">{index + 1}</td>
            <td className="border px-4 py-2">{item.type}</td>
            <td className="border px-4 py-2">{item.brand}</td>
            <td className="border px-4 py-2">{item.model}</td>
            <td className="border px-4 py-2">{item.year}</td>
            <td className="border px-4 py-2">{item.unit}</td>
            <td className="border px-4 py-2">{item.qty}</td>
            <td className="border px-4 py-2">{item.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
