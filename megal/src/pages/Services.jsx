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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
