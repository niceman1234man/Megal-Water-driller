import React from "react";
import project1 from "../assets/project1.jpg";
import project2 from "../assets/project2.jpg";
import project3 from "../assets/project3.jpg";
import project4 from "../assets/project4.jpg";
import park2 from "../assets/park2.jpg";
import v1 from "../assets/v1.mp4";
import v2 from "../assets/v2.mp4";
import v3 from "../assets/v1.mp4";
import v4 from "../assets/v2.mp4";
import v5 from "../assets/v5.mp4";
import v6 from "../assets/v6.mp4";
const Gallery = () => {
  const images = [project1, project2, project3, project4, park2];

  const videos = [
    v1,
    v2,
    v3,
    v4,
    v5,
    v6,
  ];

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
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Gallery ${i + 1}`}
              className="rounded shadow hover:scale-105 transition-transform duration-300 object-cover w-full h-64"
            />
          ))}
        </div>
      </div>

      {/* Videos Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((url, i) => (
            <div key={i} className="aspect-video">
              <iframe
                className="w-full h-full rounded shadow"
                src={url}
                title={`Video ${i + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
