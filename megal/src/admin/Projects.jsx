import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import axiosInstance from "../axiosInstance";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    client: "",
    startDate: "",
    endDate: "",
    period: "",
    status: "planned",
    percentageOfCompletion: 0,
    budget: "",
    unit: "ETB",
    contractor: "Prime",
    acceptance: "Pending",
    roleOfBinder: "Contractor",
    location: "",
  });
  const [file, setFile] = useState(null); // single file per upload
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axiosInstance.get("/api/projects");
      setProjects(res.data);
    } catch {
      toast.error("Failed to fetch projects.");
    }
  };

  const validateForm = () => {
    if (!form.title.trim()) return "Project title is required.";
    if (!form.client.trim()) return "Client is required.";
    if (!form.startDate) return "Start date is required.";
    if (!form.endDate) return "End date is required.";
    if (new Date(form.startDate) > new Date(form.endDate))
      return "Start date cannot be after end date.";
    return null;
  };

  const addOrUpdateProject = async () => {
    const error = validateForm();
    if (error) return toast.error(error);

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (editingId) {
        const res = await axiosInstance.put(`/api/projects/${editingId}`, form, config);
        setProjects(projects.map((p) => (p._id === editingId ? res.data : p)));
        setEditingId(null);
      } else {
        // add project with optional single media
        const data = new FormData();
        Object.keys(form).forEach((key) => data.append(key, form[key]));
        if (file) data.append("file", file);

        const res = await axiosInstance.post("/api/projects", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        setProjects([res.data, ...projects]);
      }
      resetForm();
    } catch (err) {
      toast.error("Failed to save project.");
      console.error(err);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      client: "",
      startDate: "",
      endDate: "",
      period: "",
      status: "planned",
      percentageOfCompletion: 0,
      budget: "",
      unit: "ETB",
      contractor: "Prime",
      acceptance: "Pending",
      roleOfBinder: "Contractor",
      location: "",
    });
    setFile(null);
    setEditingId(null);
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project and all its media?")) return;
    try {
      await axiosInstance.delete(`/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(projects.filter((p) => p._id !== id));
      toast.success("Deleted successfully.");
    } catch {
      toast.error("Failed to delete project.");
    }
  };

  const editProject = (project) => {
    const { media, _id, ...rest } = project;
    setForm({
      ...rest,
      startDate: rest.startDate?.slice(0, 10) || "",
      endDate: rest.endDate?.slice(0, 10) || "",
    });
    setEditingId(_id);
    setFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Add new media (video/image) to existing project
  const addMediaToProject = async (projectId, selectedFile) => {
    if (!selectedFile) return toast.error("Please choose a file.");
    try {
      const data = new FormData();
      data.append("file", selectedFile);
      const res = await axiosInstance.post(`/api/projects/${projectId}/media`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setProjects(projects.map((p) => (p._id === projectId ? res.data : p)));
      toast.success("Media added.");
    } catch (err) {
      toast.error("Failed to add media.");
      console.error(err);
    }
  };

  // ✅ Delete individual media from project
  const deleteMedia = async (projectId, mediaId) => {
    if (!window.confirm("Delete this media file?")) return;
    try {
      const res = await axiosInstance.delete(`/api/projects/${projectId}/media/${mediaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(projects.map((p) => (p._id === projectId ? res.data : p)));
      toast.success("Media deleted.");
    } catch {
      toast.error("Failed to delete media.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">
          {editingId ? "Edit Project" : "Add New Project"}
        </h1>

        {/* Project Form */}
        <div className="grid gap-3 mb-6 sm:grid-cols-2">
          <label>
            Project Title *
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </label>

          <label>
            Client *
            <input
              type="text"
              value={form.client}
              onChange={(e) => setForm({ ...form, client: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </label>

          <label>
            Start Date *
            <input
              type="date"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </label>

          <label>
            End Date *
            <input
              type="date"
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </label>

          <label className="sm:col-span-2">
            Description
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </label>

          <label className="sm:col-span-2">
            Upload Image/Video (optional)
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="border p-2 rounded w-full"
            />
          </label>

          <div className="flex gap-2 sm:col-span-2 mt-4">
            <button
              onClick={addOrUpdateProject}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              {editingId ? "Update Project" : "Add Project"}
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

        {/* Project List */}
        {projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project._id}
              className="border-b py-4 flex flex-col sm:flex-row justify-between gap-4 hover:bg-gray-50"
            >
              <div className="flex-1">
                <h3 className="font-bold text-blue-700">{project.title}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
                <p className="text-sm text-gray-500 italic mt-1">
                  Client: {project.client} | Location: {project.location}
                </p>
              </div>

              {/* Media list */}
              <div className="flex flex-wrap gap-2">
                {project.media?.map((m) => (
                  <div key={m._id} className="relative">
                    {m.type === "video" ? (
                      <video
                        src={m.url}
                        controls
                        className="w-24 h-24 object-cover rounded shadow"
                      />
                    ) : (
                      <img
                        src={m.url}
                        alt="media"
                        className="w-24 h-24 object-cover rounded shadow"
                      />
                    )}
                    <button
                      onClick={() => deleteMedia(project._id, m._id)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Add new media to project */}
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1 cursor-pointer text-sm text-blue-600">
                  <FiPlus /> Add Media
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) =>
                      addMediaToProject(project._id, e.target.files[0])
                    }
                    className="hidden"
                  />
                </label>

                <button
                  onClick={() => editProject(project)}
                  className="text-green-600 hover:text-green-800"
                >
                  <FiEdit size={18} />
                </button>
                <button
                  onClick={() => deleteProject(project._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FiTrash2 size={18} />
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
