import React ,{useState,useEffect} from "react";

import axios from "axios"
const Services = () => {
  const [assets, setAssets] = useState([]);
   const [equipments, setEquipments] = useState([])
   const [services, setServices] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/services").then((res)=> setServices(res.data));
 axios.get("http://localhost:5000/api/assets").then((res) => setAssets(res.data));
  axios.get("http://localhost:5000/api/equipments")
      .then((res) => setEquipments(res.data));
    }, []);
  const services2 = [
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

  return (
    <section className="bg-white text-white py-0">
      <div className="">
        {/* Hero Header */}
        <section className="h-screen bg-blue-800 text-white flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Our Services</h1>
            <p className="text-white max-w-2xl mx-auto text-lg">
              We deliver professional and sustainable water well drilling solutions tailored to your needs.
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
          <h2 className="text-black text-4xl text-center py-4">Main Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {
              services.length === 0 ? (
                <p className="text-gray-500">No services available</p>
              ) : (
                services.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 p-6 border-t-4 border-blue-600">
                    <div className="text-4xl mb-4 text-blue-700" >{service.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-800">{service.title}</h3>
                    <p className="text-gray-700">{service.description}</p>
                  </div>
                ))
              )
            }
          </div>

            

          <div className="text-black text-center py-6">
            <h1 className="text-4xl font-semibold py-5">Our Assets</h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
         
                {
                  assets.length === 0 ? (
                    <p className="text-gray-500">No assets available</p>
                  ) : (
                    assets.map((asset) => (
                      <div key={asset._id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-2">{asset.name}</h3>
                        {asset.image && (
                          <img
                            src={`http://localhost:5000${asset.image}`}
                            alt={asset.name}
                            className="w-full h-48 object-cover rounded mb-2"
                          />
                        )}
                       
                      </div>
                    ))
                  )}
               
              
            </div>

            <section className="p-6 bg-white text-blue-900 max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">The Company’s Equipment</h2>

              {/* ✅ Makes table scrollable on small screens */}
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
                    {
                    equipments.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center py-4">No equipment available</td>
                    </tr>
                    ) : (
                      equipments.map((item, index) => (
                        <tr key={item.id} className="hover:bg-blue-50 transition duration-200">
                          <td className="border px-4 py-2">{index + 1}</td>
                          <td className="border px-4 py-2">{item.type}</td>
                          <td className="border px-4 py-2">{item.brand}</td>
                          <td className="border px-4 py-2">{item.model}</td>
                          <td className="border px-4 py-2">{item.year}</td>
                          <td className="border px-4 py-2">{item.unit}</td>
                          <td className="border px-4 py-2">{item.qty}</td>
                          <td className="border px-4 py-2">{item.description}</td>
                        </tr>
                      ))
                    )}
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
