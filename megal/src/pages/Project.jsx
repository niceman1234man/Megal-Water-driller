import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/api/projects")
      .then((res) => setProjects(res.data))
      .catch(() => setProjects([]));
  }, []);

  return (
    <section className="bg-white text-blue-900">
      {/* Hero */}
      <section className="h-screen bg-blue-500 flex flex-col items-center justify-center text-center px-4 relative">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Projects
          </h1>
          <p className="text-white/90 text-lg">
            A showcase of water well drilling, pump installations, and
            hydrogeological projects we've proudly delivered across Ethiopia.
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

      {/* Projects list */}
      <section className="max-w-7xl mx-auto py-10">
        <div
          id="projectsList"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project._id}
                className="border-b py-4 flex items-start justify-between gap-4 hover:bg-gray-50"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-blue-700">{project.title}</h3>
                  <p className="text-sm text-gray-600">{project.description}</p>
                  <div className="text-sm text-gray-500 italic mt-1">
                    <p>Client: {project.client}</p>
                    <p>Location: {project.location}</p>
                    <p>
                      Budget: {project.budget} {project.unit}
                    </p>
                    <p>Contractor: {project.contractor}</p>
                    <p>
                      Status: {project.status} ({project.percentageOfCompletion}
                      %)
                    </p>
                    <p>Acceptance: {project.acceptance}</p>
                    <p>Role of Binder: {project.roleOfBinder}</p>
                    <p>
                      Start: {new Date(project.startDate).toDateString()} | End:{" "}
                      {new Date(project.endDate).toDateString()}
                    </p>
                  </div>
                </div>
                {project.image && (
                  <img
                    src={`${project.image}`}
                    alt="project"
                    className="w-24 h-24 object-cover rounded shadow"
                  />
                )}

               
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No projects found.</p>
          )}
        </div>
      </section>
    </section>
  );
};

export default Projects;
