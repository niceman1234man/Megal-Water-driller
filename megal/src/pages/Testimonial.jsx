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

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">
          Client Testimonials
        </h1>

        {testimonials.length > 0 ? (
          testimonials.map((t) => (
            <div
              key={t._id}
              className="border-b py-6 flex flex-col gap-4 items-center"
            >
              <div className="text-center">
                <p className="font-semibold text-blue-700">{t.name}</p>
                <p className="text-sm text-gray-600 italic">{t.company}</p>
                <p className="text-gray-700 mt-1">{t.comment}</p>
              </div>

              {t.image && (
                <>
                  {isPDF(t.image) ? (
                    <iframe
                      src={t.image}
                      title={t.name}
                      className="w-full h-[500px] border rounded shadow"
                    />
                  ) : (
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-32 h-32 object-cover rounded-full shadow"
                    />
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No testimonials found.</p>
        )}
      </div>
    </div>
  );
}
