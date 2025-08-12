import React,{useState,useEffect} from "react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch(() => setProjects([]));
  }, []);
  return (
    <section className="bg-white text-blue-900 ">
      <section className="h-screen bg-blue-700 flex items-center justify-center text-center px-4">
  <div className="max-w-3xl">
    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
      Our Projects
    </h1>
    <p className="text-white/90 text-lg">
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

      <section className="max-w-7xl mx-auto py-4">
        {/* Project Cards */}
        <div id="projectsList" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            projects.length === 0 ? (
              <p className="text-gray-500">No projects available</p>
            ) : (
              projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-blue-50 border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                >
                  <img
                    src={`http://localhost:5000${project.image}`}
                    alt={project.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-blue-800">{project.title}</h3>
                    <p className="text-gray-600 mt-1">{project.description}</p>
                    <p className="text-sm text-blue-700 mt-2">📍 {project.location}</p>
                  </div>
                </div>
              ))
            )
          }
        </div>
          
      
      </section>
    </section>
  );
};

export default Projects;
