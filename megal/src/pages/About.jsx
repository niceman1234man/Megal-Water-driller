import React, { useState, useEffect } from "react";
import heroImage from "../assets/home.jpg";
import license from "../assets/license.pdf";
import axiosInstance from "../axiosInstance";

const AboutUs = () => {
  const [about, setAbout] = useState({
    overview: "",
    mission: "",
    vision: "",
    goals: "",
    licenses: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/api/about")
      .then((res) => setAbout(res.data))
      .catch(() => alert("Failed to load About content"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white text-blue-900">
      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-blue-600 bg-opacity-70"></div>
        <div className="relative z-10 text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Megal Water Drilling PLC
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Empowering communities through sustainable and professional water
            well drilling solutions.
          </p>
          <a
            href="#overview"
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce text-white text-3xl"
            aria-label="Scroll Down"
          >
            ⬇️
          </a>
        </div>
      </section>

      {/* Company Overview */}
      <section id="overview" className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-center">
        <img
          src={heroImage}
          alt="Megal Office"
          className="rounded-lg shadow-md w-full h-auto object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">
            Company Overview
          </h2>
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : (
            <p className="text-gray-700 leading-relaxed">
              {about.overview ||
                "Megal Water Well Drilling PLC is a private consultancy and construction company established in 2009 EC in Addis Ababa, Ethiopia. We specialize in water resource development, hydrogeology, and agricultural engineering."}
            </p>
          )}
        </div>
      </section>

      {/* Mission, Vision, Goals */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Mission */}
          <div className="p-6 rounded-lg shadow border-t-4 border-blue-500">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-700">
              {about.mission ||
                "To provide reliable, affordable, and environmentally sustainable water well drilling services that address the water needs of rural and urban communities, institutions, and industries across Ethiopia."}
            </p>
          </div>
          {/* Vision */}
          <div className="p-6 rounded-lg shadow border-t-4 border-blue-500">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Our Vision
            </h3>
            <p className="text-gray-700">
              {about.vision ||
                "To become Ethiopia’s most trusted and innovative provider of groundwater development and water well drilling solutions, driving social and economic transformation through sustainable water access."}
            </p>
          </div>
          {/* Goals */}
          <div className="p-6 rounded-lg shadow border-t-4 border-blue-500">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Our Goals
            </h3>
            {about.goals ? (
              <p className="text-gray-700">{about.goals}</p>
            ) : (
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Enhance access to clean water in underserved areas.</li>
                <li>
                  Invest in cutting-edge drilling equipment and skilled
                  professionals.
                </li>
                <li>
                  Ensure strict adherence to environmental and technical
                  standards.
                </li>
                <li>Promote sustainable groundwater resource management.</li>
                <li>
                  Foster strong collaboration with stakeholders and communities.
                </li>
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Licenses Section */}
     {/* Licenses Section */}
<section className="bg-gray-50 px-6 py-12">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-2xl font-bold mb-4">Our Licenses</h2>
    <p className="mb-6 text-gray-700">
      We are fully certified and licensed by the appropriate government
      authorities.
    </p>

    {about.licenses && about.licenses.length > 0 ? (
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
        {about.licenses.map((license, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-md p-4 flex flex-col justify-between"
          >
            <p className="text-sm font-medium text-gray-800 mb-2">
              {license.filename || `License ${index + 1}`}
            </p>
            <iframe
              src={license.url}
              title={`License ${index + 1}`}
              className="w-full h-64 border rounded"
            />
            <a
              href={license.url}
              target="_blank"
              rel="noreferrer"
              className="mt-2 text-blue-600 underline text-sm"
            >
              View Full PDF
            </a>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-600">No licenses uploaded yet.</p>
    )}
  </div>
</section>

    </div>
  );
};

export default AboutUs;
