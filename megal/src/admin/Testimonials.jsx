import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
 import { toast } from 'react-toastify';
export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({ name: "", comment: "", company: "" });
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await axiosInstance.get("/api/testimonials");
      setTestimonials(res.data);
    } catch {
      toast.error("Failed to fetch testimonials.");
    }
  };

  const addOrUpdateTestimonial = async () => {
    if (!form.name || !form.comment)
      return alert("Name and comment are required.");

    const data = new FormData();
    data.append("name", form.name);
    data.append("comment", form.comment);
    data.append("company", form.company);
    if (file) data.append("file", file); // file can be image or pdf

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      if (editingId) {
        const res = await axiosInstance.put(
          `/api/testimonials/${editingId}`,
          data,
          config
        );
        setTestimonials(
          testimonials.map((t) => (t._id === editingId ? res.data : t))
        );
      } else {
        const res = await axiosInstance.post(
          "/api/testimonials",
          data,
          config
        );
        setTestimonials([res.data, ...testimonials]);
      }
      resetForm();
    } catch {
      toast.error("Failed to save testimonial.");
    }
  };

  const deleteTestimonial = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await axiosInstance.delete(`/api/testimonials/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTestimonials(testimonials.filter((t) => t._id !== id));
    } catch {
      toast.error("Failed to delete.");
    }
  };

  const editTestimonial = (testimonial) => {
    setForm({
      name: testimonial.name,
      comment: testimonial.comment,
      company: testimonial.company,
    });
    setEditingId(testimonial._id);
    setFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setForm({ name: "", comment: "", company: "" });
    setFile(null);
    setEditingId(null);
  };

  const isPDF = (filename) => filename?.toLowerCase().endsWith(".pdf");

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">
          {editingId ? "Edit Testimonial" : "Add Testimonial"}
        </h1>

        {/* Add/Edit Testimonial Form */}
        <div className="mb-6 grid gap-3">
          <input
            type="text"
            placeholder="Client Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Company (optional)"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <textarea
            placeholder="Comment"
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded"
          />
          <div className="flex gap-2">
            <button
              onClick={addOrUpdateTestimonial}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              {editingId ? "Update" : "Add"} Testimonial
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

        {/* Testimonials List */}
        {testimonials.length > 0 ? (
          testimonials.map((t) => (
            <div
              key={t._id}
              className="border-b py-4 flex justify-between items-start gap-4"
            >
              <div className="flex-1">
                <p className="font-semibold text-blue-700">{t.name}</p>
                <p className="text-sm text-gray-600 italic">{t.company}</p>
                <p className="text-gray-700 mt-1">{t.comment}</p>
              </div>

              {/* File display (image or PDF link) */}
              {t.image && (
                isPDF(t.image) ? (
                  <a
                    href={`${axiosInstance}${t.image}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 underline text-sm"
                  >
                    View PDF
                  </a>
                ) : (
                  <img
                    src={`${axiosInstance}${t.image}`}
                    alt="client"
                    className="w-20 h-20 object-cover rounded-full"
                  />
                )
              )}

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => editTestimonial(t)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTestimonial(t._id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No testimonials found.</p>
        )}
      </div>
    </div>
  );
}
