import React, { useEffect, useState } from "react";
 import { toast } from 'react-toastify';
import { FiEdit, FiTrash2 } from "react-icons/fi";
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
  const [file, setFile] = useState(null);
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
    if (form.percentageOfCompletion < 0 || form.percentageOfCompletion > 100)
      return "Completion % must be between 0 and 100.";
    if (form.budget && form.budget < 0) return "Budget cannot be negative.";
    return null;
  };

  const addOrUpdateProject = async () => {
    const error = validateForm();
    if (error) return alert(error);

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });
    if (file) data.append("image", file);

    try {
      if (editingId) {
        const res = await axiosInstance.put(
          `/api/projects/${editingId}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProjects(
          projects.map((p) => (p._id === editingId ? res.data : p))
        );
        setEditingId(null);
      } else {
        const res = await axiosInstance.post("/api/projects", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects([res.data, ...projects]);
      }
      resetForm();
    } catch {
      toast.error("Failed to save project.");
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axiosInstance.delete(`/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(projects.filter((p) => p._id !== id));
    } catch {
      toast.error("Failed to delete project.");
    }
  };

  const editProject = (project) => {
    const { image, _id, ...rest } = project;
    setForm({
      ...rest,
      startDate: rest.startDate?.slice(0, 10) || "",
      endDate: rest.endDate?.slice(0, 10) || "",
    });
    setEditingId(_id);
    setFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">
          {editingId ? "Edit Project" : "Add New Project"}
        </h1>

        {/* Project Form */}
        <div className="grid gap-3 mb-6 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Project Title *"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Client *"
            value={form.client}
            onChange={(e) => setForm({ ...form, client: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Period"
            value={form.period}
            onChange={(e) => setForm({ ...form, period: e.target.value })}
            className="border p-2 rounded"
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="planned">Planned</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
          <input
            type="number"
            placeholder="Completion %"
            value={form.percentageOfCompletion}
            onChange={(e) =>
              setForm({
                ...form,
                percentageOfCompletion: Math.max(0, e.target.value),
              })
            }
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Budget"
            value={form.budget}
            onChange={(e) =>
              setForm({ ...form, budget: Math.max(0, e.target.value) })
            }
            className="border p-2 rounded"
          />
          <select
            value={form.unit}
            onChange={(e) => setForm({ ...form, unit: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="ETB">ETB</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
          <select
            value={form.contractor}
            onChange={(e) => setForm({ ...form, contractor: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="Prime">Prime</option>
            <option value="Sub Contractor">Sub Contractor</option>
          </select>
          <select
            value={form.acceptance}
            onChange={(e) => setForm({ ...form, acceptance: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select
            value={form.roleOfBinder}
            onChange={(e) => setForm({ ...form, roleOfBinder: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="Contractor">Contractor</option>
            <option value="Sub Contractor">Sub Contractor</option>
          </select>
          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="border p-2 rounded"
          />
          <textarea
            placeholder="Project Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border p-2 rounded sm:col-span-2"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded sm:col-span-2"
          />
          <div className="flex gap-2 sm:col-span-2">
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

        {/* Projects List */}
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
                  <p>Budget: {project.budget} {project.unit}</p>
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
                  src={`${axiosInstance.defaults.baseURL}${project.image}`}
                  alt="project"
                  className="w-24 h-24 object-cover rounded shadow"
                />
              )}
              
              <div className="flex gap-3">
                              <button
                                onClick={() => editProject(project)}
                                className="text-green-600 hover:text-green-800"
                                aria-label="Edit"
                              >
                                <FiEdit size={18} />
                              </button>
              
                              <button
                                     onClick={() => deleteProject(project._id)}
                                className="text-red-600 hover:text-red-800"
                                aria-label="Delete"
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
