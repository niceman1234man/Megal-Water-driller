import React from "react";
import heroImage from "../assets/home.jpg";
const AboutUs = () => {
  return (
    <section className="bg-white text-blue-900 ">
      
        {/* Page Header */}
        <div className="bg-blue-700">
             <section className="relative h-screen w-full overflow-hidden bg-blue-700">
          {/* Image */}
          <img
            src={heroImage} // place this image in public/assets/about.jpg
            alt="Megal Water Drilling"
            className="w-full h-full object-cover"
          />

          {/* Overlay Text */}
          <div className="absolute inset-0  bg-opacity-60 flex items-center justify-center">
            <div className="text-center px-4 text-blue-950">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                About Megal Water Drilling PLC
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto">
                Empowering communities through sustainable and professional
                water well drilling solutions.
              </p>
            </div>
             <a
    href="#projectsList"
    className="absolute bottom-8 animate-bounce text-white text-3xl"
    aria-label="Scroll Down"
  >
    ⬇️
  </a>
          </div>
          
        </section>
        </div>
       <div className="max-w-7xl mx-auto space-y-16 py-5">

        {/* Company Overview */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src={heroImage} // Update with your actual image
            alt="Megal Office"
            className="rounded-lg shadow-md"
          />
          <div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">
              Company Overview
            </h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>Megal Water Well Drilling PLC</strong> is a private
              consultancy and construction company established in{" "}
              <strong>2009 EC</strong> in Addis Ababa, Ethiopia. We specialize
              in water resource development, hydrogeology, and agricultural
              engineering. The company is licensed under{" "}
              <strong>MT/AA/14/673/633385/2009</strong> and committed to
              quality, sustainability, and technical excellence.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-blue-50 rounded-lg p-8 shadow-md">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            To provide <strong>reliable</strong>, <strong>affordable</strong>,
            and <strong>environmentally sustainable</strong> water well drilling
            services that address the water needs of rural and urban
            communities, institutions, and industries across Ethiopia.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-blue-50 rounded-lg p-8 shadow-md">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Our Vision
          </h2>
          <p className="text-gray-700 leading-relaxed">
            To become Ethiopia’s most trusted and innovative provider of
            groundwater development and water well drilling solutions, driving
            social and economic transformation through sustainable water access.
          </p>
        </div>

        {/* Goals */}
        <div className="bg-blue-50 rounded-lg p-8 shadow-md">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Our Goals
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Enhance access to clean water in underserved areas.</li>
            <li>
              Invest in cutting-edge drilling equipment and skilled
              professionals.
            </li>
            <li>
              Ensure strict adherence to environmental and technical standards.
            </li>
            <li>Promote sustainable groundwater resource management.</li>
            <li>
              Foster strong collaboration with stakeholders and communities.
            </li>
          </ul>
        </div>

       
      </div>
    </section>
  );
};

export default AboutUs;
