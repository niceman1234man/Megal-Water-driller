import React, { useState, useEffect } from "react";
import axios from "axios";

export default function GalleryAdmin() {
  const [mediaList, setMediaList] = useState([]);
  const [form, setForm] = useState({ location: "", client: "" });
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("/api/gallery").then((res) => setMediaList(res.data));
  }, []);

  const resetForm = () => {
    setForm({ location: "", client: "" });
    setFile(null);
    setEditingId(null);
  };

  const addOrUpdateMedia = async () => {
    const data = new FormData();
    data.append("location", form.location);
    data.append("client", form.client);
    if (file) data.append("file", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      if (editingId) {
        const res = await axios.put(`/api/gallery/${editingId}`, data, config);
        setMediaList(mediaList.map((m) => (m._id === editingId ? res.data : m)));
      } else {
        const res = await axios.post("/api/gallery", data, config);
        setMediaList([res.data, ...mediaList]);
      }
      resetForm();
    } catch {
      alert("Failed to save media.");
    }
  };

  const deleteMedia = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await axios.delete(`/api/gallery/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMediaList(mediaList.filter((m) => m._id !== id));
    } catch {
      alert("Failed to delete.");
    }
  };

  const editMedia = (item) => {
    setForm({ location: item.location, client: item.client });
    setEditingId(item._id);
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">
          {editingId ? "Edit Media" : "Add New Media"}
        </h1>

        {/* Form */}
        <div className="grid gap-3 mb-6">
          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Client Company"
            value={form.client}
            onChange={(e) => setForm({ ...form, client: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded"
          />
          <div className="flex gap-2">
            <button
              onClick={addOrUpdateMedia}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              {editingId ? "Update" : "Add"} Media
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

        {/* Media List */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {mediaList.map((item) => (
            <div key={item._id} className="border p-3 rounded shadow">
              {item.url.endsWith(".mp4") ? (
                <video src={item.url} controls className="w-full h-48 object-cover rounded" />
              ) : (
                <img src={item.url} alt="media" className="w-full h-48 object-cover rounded" />
              )}
              <div className="mt-2">
                <p className="text-sm text-gray-700">
                  <strong>Client:</strong> {item.client}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Location:</strong> {item.location}
                </p>
              </div>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => editMedia(item)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMedia(item._id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
