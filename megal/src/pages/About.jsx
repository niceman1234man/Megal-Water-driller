import React,{useState,useEffect} from "react";
import heroImage from "../assets/home.jpg";
import license from "../assets/license.pdf"
import axios from "axios";
import axiosInstance from "../axiosInstance";
const AboutUs = () => {
  const [about, setAbout] = useState({
    overview: "",
    mission: "",
    vision: "",
    goals: "",
    licenses: []
  });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axiosInstance.get("/api/about")
      .then((res) => setAbout(res.data))
      .catch(() => alert("Failed to load About content"))
      .finally(() => setLoading(false));
  }, []);
  return (
    <section className="bg-white text-blue-900 ">
      
        {/* Page Header */}
        <div className="bg-blue-700">
             <section className="relative h-screen w-full overflow-hidden bg-blue-700">
          

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
  
{  console.log(about.goals)}
        {/* Company Overview */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src={heroImage} // Update with your actual image
            alt="Megal Office"
            className="rounded-lg shadow-md"
          />
          <div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-3 text-center md:text-left">
              Company Overview
            </h2>
            {loading ? (
              <p className="text-gray-600">Loading...</p>
            ) : (
              <p className="text-gray-700 leading-relaxed">
                {about.overview || "Megal Water Well Drilling PLC is a private consultancy and construction company established in 2009 EC in Addis Ababa, Ethiopia. We specialize in water resource development, hydrogeology, and agricultural engineering."}
              
            </p>
            )}
          </div>
        </div>
        {/* Mission, Vision, Goals */}
        <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 mt-6 ">
          <div className=" p-6 rounded-lg shadow border-r-2 border-b-4 border-blue-500">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Our Mission</h3>
            <p className="text-gray-700">
              {about.mission || "To provide reliable, affordable, and environmentally sustainable water well drilling services that address the water needs of rural and urban communities, institutions, and industries across Ethiopia."}
            </p>
          </div>
          <div className=" p-6 rounded-lg shadow border-r-2 border-b-4 border-blue-500">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Our Vision
            </h3>
            <p className="text-gray-700">
              {about.vision || "To become Ethiopia’s most trusted and innovative provider of groundwater development and water well drilling solutions, driving social and economic transformation through sustainable water access."}
            </p>
          </div>
          <div className=" p-6 rounded-lg shadow border-r-2 border-b-4 border-blue-500">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Our Goals
            </h3>
            {about.goals ? (
              <p>{about.goals}</p>
            

              ):(
                <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Enhance access to clean water in underserved areas.</li>
              <li>Invest in cutting-edge drilling equipment and skilled professionals.</li>
              <li>Ensure strict adherence to environmental and technical standards.</li>
              <li>Promote sustainable groundwater resource management.</li>
              <li>Foster strong collaboration with stakeholders and communities.</li>
            </ul>
              )}
            
            
          </div>
        </div>
        </div>
        {/* Licenses Section */}
        <section className="p-6 bg-white text-blue-900 max-w-9xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Our Licenses</h2>
          <p className="mb-4 text-gray-700">We are fully certified and licensed by the appropriate government authorities.</p>
          <div className="w-full h-[600px] border shadow-lg rounded overflow-hidden">
            <iframe
              src={license}
              title="Company License"
              width="100%"
              height="100%"
              className="border-none"
            ></iframe>
          </div>
        </section>
        
            {/* <p className="text-gray-700 leading-relaxed">
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
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Mission */}
        {/* <div className=" rounded-lg p-8 shadow-md shadow-blue-800 border-t-4 border-blue-700">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-center">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            To provide <strong>reliable</strong>, <strong>affordable</strong>,
            and <strong>environmentally sustainable</strong> water well drilling
            services that address the water needs of rural and urban
            communities, institutions, and industries across Ethiopia.
          </p>
        </div> */}

        {/* Vision */}
        {/* <div className=" rounded-lg p-8 shadow-md shadow-blue-800 border-t-4 border-blue-700">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-center">
            Our Vision
          </h2>
          <p className="text-gray-700 leading-relaxed">
            To become Ethiopia’s most trusted and innovative provider of
            groundwater development and water well drilling solutions, driving
            social and economic transformation through sustainable water access.
          </p>
        </div> */}

        {/* Goals */}
        {/* <div className=" rounded-lg p-8 shadow-md shadow-blue-800 border-t-4 border-blue-700">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-center">
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
       
      </div> */}

{/* <section className="p-6 bg-white text-blue-900 max-w-9xl mx-auto">
  <h2 className="text-2xl font-bold mb-4 text-center">Our Licenses</h2>
  <p className="mb-4 text-gray-700">We are fully certified and licensed by the appropriate government authorities.</p>

  <div className="w-full h-[600px] border shadow-lg rounded overflow-hidden">
    <iframe
      src={license}
      title="Company License"
      width="100%"
      height="100%"
      className="border-none"
    ></iframe>
  </div>
</section> */} */


    </section>

    
  );
};

export default AboutUs;
