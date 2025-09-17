import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../axiosInstance";

const Gallery = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/api/gallery")
      .then((res) => setFiles(res.data)) 
      .catch(() => setFiles([]));
  }, []);

  // Separate into images & videos based on file extension
  const images = files.filter((file) =>
    file.url.match(/\.(jpg|jpeg|png|gif)$/i)
  );

  const videos = files.filter((file) =>
    file.url.match(/\.(mp4|webm|ogg)$/i)
  );

  return (
    <section className="min-h-screen bg-white text-blue-900 px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Gallery</h1>
        <p className="text-gray-600">
          Explore our past projects in images and videos.
        </p>
      </div>

      {/* Images Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((item, i) => (
            <div key={i} className="border border-b-blue-900 rounded shadow-2xl p-2">
              <img
                src={`${item.url}`}
                alt={`Gallery ${i + 1}`}
                className="rounded shadow hover:scale-105 transition-transform duration-300 object-cover w-full h-64"
              />
              <p className="mt-2 text-sm text-gray-700">
                 {item.client}
              </p>
              <p className="text-sm text-gray-700">
                <strong>📍</strong> {item.location}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Videos Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg-grid-cols-3 gap-6">
          {videos.map((item, i) => (
            <div key={i} className="aspect-video border rounded shadow p-2">
              <video
                src={`${item.url}`}
                controls
                className="w-full h-full rounded shadow"
              />
              <p className="mt-2 text-sm text-gray-700">
                 {item.client}
              </p>
              <p className="text-sm text-gray-700">
                <strong>📍</strong> {item.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
