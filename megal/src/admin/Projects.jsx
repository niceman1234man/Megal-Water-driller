import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", location: "" });
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects");
      setProjects(res.data);
    } catch {
      alert("Failed to fetch projects.");
    }
  };

  const addOrUpdateProject = async () => {
    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("location", form.location);
    if (file) data.append("image", file);

    try {
      if (editingId) {
        const res = await axios.put(`/api/projects/${editingId}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(projects.map(p => (p._id === editingId ? res.data : p)));
        setEditingId(null);
      } else {
        const res = await axios.post("/api/projects", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects([res.data, ...projects]);
      }
      resetForm();
    } catch {
      alert("Failed to save project.");
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(projects.filter(p => p._id !== id));
    } catch {
      alert("Failed to delete project.");
    }
  };

  const editProject = (project) => {
    setForm({
      title: project.title,
      description: project.description,
      location: project.location,
    });
    setEditingId(project._id);
    setFile(null);
  };

  const resetForm = () => {
    setForm({ title: "", description: "", location: "" });
    setFile(null);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">
          {editingId ? "Edit Project" : "Add New Project"}
        </h1>

        {/* Form */}
        <div className="grid gap-3 mb-6">
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
          <div className="flex gap-2">
            <button
              onClick={addOrUpdateProject}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              {editingId ? "Update" : "Add"} Project
            </button>
            {editingId && (
              <button
                onClick={resetForm}
                className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* List Projects */}
        {projects.length > 0 ? (
          projects.map(project => (
            <div
              key={project._id}
              className="border-b py-4 flex items-start justify-between gap-4"
            >
              <div className="flex-1">
                <h3 className="font-bold text-blue-700">{project.title}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
                <p className="text-sm text-gray-500 italic">{project.location}</p>
              </div>
              {project.image && (
                <img
                  src={project.image}
                  alt="project"
                  className="w-24 h-24 object-cover rounded shadow"
                />
              )}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => editProject(project)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProject(project._id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No projects found.</p>
        )}
      </div>
    </div>
  );
}
