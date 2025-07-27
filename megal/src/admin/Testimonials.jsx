import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({ name: "", comment: "", company: "" });
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("/api/testimonials").then(res => setTestimonials(res.data));
  }, []);

  const addTestimonial = async () => {
    if (!form.name || !form.comment) return alert("Name and comment are required.");

    const data = new FormData();
    data.append("name", form.name);
    data.append("comment", form.comment);
    data.append("company", form.company);
    if (file) data.append("image", file);

    try {
      const res = await axios.post("/api/testimonials", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });
      setTestimonials([res.data, ...testimonials]);
      setForm({ name: "", comment: "", company: "" });
      setFile(null);
    } catch {
      alert("Failed to submit testimonial.");
    }
  };

  const deleteTestimonial = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await axios.delete(`/api/testimonials/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTestimonials(testimonials.filter(t => t._id !== id));
    } catch {
      alert("Failed to delete.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">Manage Testimonials</h1>

        {/* Add Testimonial Form */}
        <div className="mb-6 grid gap-3">
          <input
            type="text"
            placeholder="Client Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Company (optional)"
            value={form.company}
            onChange={e => setForm({ ...form, company: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <textarea
            placeholder="Comment"
            value={form.comment}
            onChange={e => setForm({ ...form, comment: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="file"
            accept="image/*"
            onChange={e => setFile(e.target.files[0])}
            className="border p-2 rounded"
          />
          <button
            onClick={addTestimonial}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Testimonial
          </button>
        </div>

        {/* Testimonials List */}
        {/* {testimonials.map(t => (
          <div key={t._id} className="border-b py-4 flex justify-between items-start gap-4">
            <div className="flex-1">
              <p className="font-semibold text-blue-700">{t.name}</p>
              <p className="text-sm text-gray-600 italic">{t.company}</p>
              <p className="text-gray-700 mt-1">{t.comment}</p>
            </div>
            {t.image && (
              <img src={t.image} alt="client" className="w-20 h-20 object-cover rounded-full" />
            )}
            <button
            //   onClick={() => deleteTestimonial(t._id)}
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
