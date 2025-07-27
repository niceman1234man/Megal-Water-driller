import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", location: "" });
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("/api/projects").then(res => setProjects(res.data));
  }, []);

  const addProject = async () => {
    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("location", form.location);
    if (file) data.append("image", file);

    try {
      const res = await axios.post("/api/projects", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      });
      setProjects([res.data, ...projects]);
      setForm({ title: "", description: "", location: "" });
      setFile(null);
    } catch {
      alert("Failed to add project.");
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(projects.filter(p => p._id !== id));
    } catch {
      alert("Failed to delete.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">Manage Projects</h1>

        {/* Add New Project */}
        <div className="mb-6 grid gap-3">
          <input
            type="text"
            placeholder="Project Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <textarea
            placeholder="Project Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="file"
            accept="image/*"
            onChange={e => setFile(e.target.files[0])}
            className="border p-2 rounded"
          />
          <button
            onClick={addProject}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Project
          </button>
        </div>

        {/* Project List */}
        {/* {projects.map(project => (
          <div key={project._id} className="border-b py-4 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-bold text-blue-700">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
              <p className="text-sm text-gray-500 italic">{project.location}</p>
            </div>
            {project.image && (
              <img src={project.image} alt="project" className="w-24 h-24 object-cover rounded shadow" />
            )}
            <button
              onClick={() => deleteProject(project._id)}
              className="text-red-600 hover:underline text-sm"
            >
              Delete
            </button>
          </div>
        ))} */}
      </div>
    </div>
  );
}
