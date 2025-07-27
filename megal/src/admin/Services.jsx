import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Services() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });

  const token = localStorage.getItem("token");

  // Load services on mount
  useEffect(() => {
    axios.get("/api/services").then(res => setServices(res.data));
  }, []);

  const addService = async () => {
    if (!form.title) return alert("Title is required.");
    try {
      const res = await axios.post("/api/services", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices([...services, res.data]);
      setForm({ title: "", description: "" });
    } catch {
      alert("Failed to add service");
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await axios.delete(`/api/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(services.filter(s => s._id !== id));
    } catch {
      alert("Failed to delete");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">Manage Services</h1>

        {/* Add Service Form */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Service Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full mb-2 border p-2 rounded"
          />
          <textarea
            placeholder="Service Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <button
            onClick={addService}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Service
          </button>
        </div>

        {/* List Services */}
        <div>
          {/* {services.map((s) => (
            <div key={s._id} className="border-b py-2 flex justify-between items-center">
              <div>
                <strong>{s.title}</strong>
                <p className="text-sm text-gray-600">{s.description}</p>
              </div>
              <button
                onClick={() => deleteService(s._id)}
                className="text-red-500 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}
