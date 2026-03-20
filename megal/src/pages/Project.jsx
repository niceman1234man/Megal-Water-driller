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
      {/* Hero Section */}
      <section className=" flex flex-col items-center justify-center text-center px-4 relative">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold e mb-4">
            Our Projects
          </h1>
          <p className="text-lg">
            A showcase of water well drilling, pump installations, and hydrogeological
            projects we've proudly delivered across Ethiopia.
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

      {/* Projects List */}
      <section id="projectsList" className="max-w-7xl mx-auto py-10 px-4">
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.isArray(projects) && projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 border-t-4 border-r-2 border-blue-600 overflow-hidden flex flex-col"
              >
                {/* ✅ Project Info First */}
                <div className="p-4 flex-1">
                  <h3 className="font-bold text-blue-700 text-lg mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-700 mb-2">
                    {project.description || "No description available."}
                  </p>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <strong>Client:</strong> {project.client || "N/A"}
                    </p>
                    <p>
                      <strong>Location:</strong> {project.location || "N/A"}
                    </p>
                    <p>
                      <strong>Budget:</strong>{" "}
                      {project.budget ? `${project.budget} ${project.unit}` : "N/A"}
                    </p>
                    <p>
                      <strong>Status:</strong> {project.status} (
                      {project.percentageOfCompletion || 0}%)
                    </p>
                    <p>
                      <strong>Contractor:</strong> {project.contractor}
                    </p>
                    <p>
                      <strong>Acceptance:</strong> {project.acceptance}
                    </p>
                    <p>
                      <strong>Role of Binder:</strong> {project.roleOfBinder}
                    </p>
                    <p>
                      <strong>Start:</strong>{" "}
                      {project.startDate
                        ? new Date(project.startDate).toDateString()
                        : "N/A"}{" "}
                      | <strong>End:</strong>{" "}
                      {project.endDate
                        ? new Date(project.endDate).toDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                {/* ✅ Media Display at the Bottom */}
                {project.media && project.media.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2 border-t">
                    {project.media.map((m, i) => (
                      <div
                        key={i}
                        className="relative w-full h-36 rounded overflow-hidden"
                      >
                        {m.type === "video" ? (
                          <video
                            src={m.url}
                            controls
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={m.url}
                            alt={`media-${i}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-100 text-gray-500 text-center py-3 border-t">
                    No media available
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No projects available
            </p>
          )}
        </div>
      </section>
    </section>
  );
};

export default Projects;
