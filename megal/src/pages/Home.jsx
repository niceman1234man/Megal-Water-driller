import React, { useEffect, useState } from "react";
import heroImage from "../assets/home.jpg";
import park from "../assets/park.jpg";
import { Link } from "react-router-dom";
import axiosInstance from "../axiosInstance";

export default function Home() {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [contact, setContact] = useState({});
  useEffect(() => {
    axiosInstance
      .get("/api/services") // updated URL
      .then((res) => setServices(res.data));
    axiosInstance
      .get("/api/contact")
      .then((res) => setContact(res.data))
      .catch(() => setContact({}));
    axiosInstance
      .get("/api/projects")
      .then((res) => setProjects(res.data.slice(0, 3)))
      .catch(() => setProjects([]));
    axios.get("/api/testimonials").then((res) => setTestimonials(res.data.slice(0, 3))).catch(() => setTestimonials([]));
  }, []);

  useEffect(() => {
    //   axios.get("/api/services").then((res) => setServices(res.data)).catch(() => setServices([]));
    //   axios.get("/api/projects").then((res) => setProjects(res.data.slice(0, 3))).catch(() => setProjects([]));
    //   axios.get("/api/testimonials").then((res) => setTestimonials(res.data.slice(0, 3))).catch(() => setTestimonials([]));
  }, []);

  

  return (
    <div>
      <section
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
        id="home"
      >
        {console.log(services)}

        <div className="absolute top-0 left-0 right-0 z-20 bg-blue-800 bg-opacity-90 text-white text-xs md:text-sm px-4 py-2 flex flex-col md:flex-row justify-center items-center gap-2">
          {contact && contact.phones && contact.phones.length > 0 && (
            <p>📞 {contact.phones.join(" / ")}</p>
          )}

          {contact && contact.emails && contact.emails.length > 0 && (
            <p>📧 {contact.emails.join(" / ")}</p>
          )}

          {contact && contact.address && <p>🏠 {contact.address}</p>}
        </div>

        <div className="absolute inset-0 bg-blue-600 bg-opacity-70 flex items-center justify-center text-white text-center px-4 pt-20 z-10">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Welcome <br />
              to <br />
              Megal Water Drilling
            </h1>
            <p className="text-lg md:text-2xl max-w-2xl mx-auto">
              Reliable, sustainable, and affordable water solutions across
              Ethiopia.
            </p>
            <a
              href="#services"
              className="mt-6 inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded shadow hover:bg-blue-100 transition"
            >
              Explore Our Services
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white text-blue-900" id="about">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <img
            src={park}
            alt="Megal Team"
            className="rounded-lg shadow-md w-full h-auto object-cover"
          />

          <div>
            <h2 className="text-3xl font-bold mb-4">
              About Megal Water Drilling
            </h2>
            <p className="text-gray-700 mb-4">
              Megal Water Drilling is a leading company in Ethiopia, delivering
              high-quality water well drilling and sustainable groundwater
              solutions.
            </p>
            <p className="text-gray-700 mb-4">
              Our mission is to provide access to clean and safe water by using
              modern equipment, skilled professionals, and environmentally
              responsible practices.
            </p>
            <p className="text-sm text-gray-500">
              💧 “Drilling water, building futures.”
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" id="services">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">
            Our Services
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(services) && services.length > 0 ? (
              services.map((service) => (
                 <div
                    key={service.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 p-6 border-t-4 border-blue-600 ">
                    <div className="text-4xl mb-4 text-blue-700" >{service.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-800">{service.title}</h3>
                    <p className="text-gray-700">{service.description}</p>
                  </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No services available
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" id="projects">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">
            Recent Projects
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(projects) && projects.length > 0 ? (
              projects.map((project) => (
                <div
                  key={project._id || project.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 p-6 border-t-4 border-r-2 border-blue-600 overflow-hidden"
                >
                  <img
                    src={`${project.image}`}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-blue-700">{project.title}</h3>
                    <p className="text-sm text-gray-600">
                      {project.description}
                    </p>
                    <div className="text-sm text-gray-500 italic mt-1">
                      <p>Client: {project.client}</p>
                      <p>Location: {project.location}</p>
                      <p>
                        Budget: {project.budget} {project.unit}
                      </p>
                      <p>Contractor: {project.contractor}</p>
                      <p>
                        Status: {project.status} (
                        {project.percentageOfCompletion}
                        %)
                      </p>
                      <p>Acceptance: {project.acceptance}</p>
                      <p>Role of Binder: {project.roleOfBinder}</p>
                      <p>
                        Start: {new Date(project.startDate).toDateString()} |
                        End: {new Date(project.endDate).toDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No projects available
              </p>
            )}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-block bg-blue-700 text-white font-semibold px-6 py-3 rounded shadow hover:bg-blue-800 transition"
            >
              Explore More Projects
            </Link>
          </div>
        </div>
      </section>

      <section
        className="py-20 bg-gradient-to-b from-white to-blue-50"
        id="testimonials"
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-blue-800 mb-14">
            What Our Clients Say
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
               
            {Array.isArray(testimonials) && testimonials.length > 0 ? (testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white border border-blue-100 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 p-6 flex flex-col"
              >
                <p className="text-gray-600 italic mb-4 text-sm leading-relaxed">
                  “{t.comment}”
                </p>
                <div className="mt-auto">
                  <h4 className="font-semibold text-blue-700">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.company}</p>
                </div>
              </div>
            ))) : (
              <p className="text-gray-500 col-span-full text-center">
                No testimonials available
              </p>
            )}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/testimonials"
              className="inline-block bg-blue-700 text-white font-semibold px-6 py-3 rounded shadow hover:bg-blue-800 transition"
            >
              Explore More Testimonials
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-50 text-blue-900" id="contact">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <p className="mb-3">
                {contact && contact.phones && contact.phones.length > 0 && (
                  <p>📞 {contact.phones.join(" / ")}</p>
                )}
              </p>
              <p className="mb-3">
                {contact && contact.emails && contact.emails.length > 0 && (
                  <p>📧 {contact.emails.join(" / ")}</p>
                )}
              </p>
              <p className="mb-3">
                {contact && contact.address && <p>🏠 {contact.address}</p>}
              </p>
            </div>

            {contactInfo.mapLink && (
              <iframe
                src={contactInfo.mapLink}
                className="w-full h-64 rounded border shadow-sm"
                allowFullScreen
                loading="lazy"
                title="Google Map"
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
