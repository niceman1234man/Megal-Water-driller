import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("/api/gallery").then(res => setImages(res.data));
  }, []);

  const uploadImage = async () => {
    if (!file) return alert("Select an image first.");
    const data = new FormData();
    data.append("image", file);

    try {
      const res = await axios.post("/api/gallery", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });
      setImages([res.data, ...images]);
      setFile(null);
    } catch {
      alert("Failed to upload image.");
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await axios.delete(`/api/gallery/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setImages(images.filter(img => img._id !== id));
    } catch {
      alert("Failed to delete.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Manage Gallery</h1>

        <div className="flex items-center gap-3 mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={e => setFile(e.target.files[0])}
            className="border p-2 rounded"
          />
          <button
            onClick={uploadImage}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {/* {images.map(img => (
            <div key={img._id} className="relative">
              <img src={img.url} alt="gallery" className="w-full h-48 object-cover rounded" />
              <button
                onClick={() => deleteImage(img._id)}
                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
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
