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

  const getPDFPreview = (pdfUrl) => {
    // Cloudinary transformation: first page, 200x200
    return pdfUrl.replace(
      "/upload/",
      "/upload/so_0,w_200,h_200,c_fit/"
    );
  };

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

                {/* Display image or PDF preview */}
                {t.image && (
                  <>
                    {isPDF(t.image) ? (
                      <a
                        href={t.image} // actual PDF opens in new tab
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center mt-2 text-blue-700 underline"
                      >
                        <img
                          src={getPDFPreview(t.image)}
                          alt="PDF Preview"
                          className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded shadow mb-2"
                        />
                        View PDF
                      </a>
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
