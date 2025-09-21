import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

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

  const isPDF = (url) => url?.toLowerCase().endsWith(".pdf");

  const getGoogleViewerURL = (pdfUrl) =>
    `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-8 text-blue-700 text-center">
          Client Testimonials
        </h1>

        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div
                key={t._id}
                className="border rounded-lg p-4 flex flex-col items-center shadow hover:shadow-md transition"
              >
                <div className="text-center mb-4">
                  <p className="font-semibold text-lg text-blue-700">{t.name}</p>
                  <p className="text-sm text-gray-600 italic">{t.company}</p>
                  <p className="text-gray-700 mt-2">{t.comment}</p>
                </div>

                {/* Display image or Google Docs PDF Viewer */}
                {t.image && (
                  <>
                    {isPDF(t.image) ? (
                      <iframe
                        src={getGoogleViewerURL(t.image)}
                        title={`PDF of ${t.name}`}
                        width="100%"
                        height="500px"
                        className="border rounded shadow"
                      />
                    ) : (
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full shadow"
                      />
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No testimonials found.</p>
        )}
      </div>
    </div>
  );
}
