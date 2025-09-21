import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import pdfWorker from "pdfjs-dist/build/pdf.worker.min.js?url"; // 👈 this makes Vite copy the file and give you a URL

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;


export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [pdfPages, setPdfPages] = useState({}); // { testimonialId: { numPages, pageNumber } }

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

  const onDocumentLoadSuccess = (id, { numPages }) => {
    setPdfPages((prev) => ({
      ...prev,
      [id]: { numPages, pageNumber: 1 },
    }));
  };

  const goToPrevPage = (id) => {
    setPdfPages((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        pageNumber: Math.max(prev[id].pageNumber - 1, 1),
      },
    }));
  };

  const goToNextPage = (id) => {
    setPdfPages((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        pageNumber: Math.min(prev[id].pageNumber + 1, prev[id].numPages),
      },
    }));
  };

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

              {/* ✅ Show Cloudinary PDF or Image */}
              {t.image &&
                (isPDF(t.image) ? (
                  <div className="w-full bg-gray-50 p-4 rounded shadow">
                    <Document
                      file={t.image} // Cloudinary PDF URL
                      onLoadSuccess={(res) =>
                        onDocumentLoadSuccess(t._id, res)
                      }
                      loading={<p className="text-gray-500">Loading PDF...</p>}
                      error={<p className="text-red-500">Failed to load PDF</p>}
                    >
                      <Page
                        pageNumber={pdfPages[t._id]?.pageNumber || 1}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                        className="shadow rounded"
                      />
                    </Document>

                    {pdfPages[t._id] && (
                      <div className="mt-3 flex justify-between items-center text-blue-700 font-medium">
                        <button
                          onClick={() => goToPrevPage(t._id)}
                          disabled={pdfPages[t._id].pageNumber <= 1}
                          className="bg-blue-200 px-3 py-1 rounded disabled:opacity-50"
                        >
                          ⬅ Previous
                        </button>

                        <span>
                          Page {pdfPages[t._id].pageNumber} of{" "}
                          {pdfPages[t._id].numPages}
                        </span>

                        <button
                          onClick={() => goToNextPage(t._id)}
                          disabled={
                            pdfPages[t._id].pageNumber >=
                            pdfPages[t._id].numPages
                          }
                          className="bg-blue-200 px-3 py-1 rounded disabled:opacity-50"
                        >
                          Next ➡
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <img
                    src={t.image} // Cloudinary image URL
                    alt="client"
                    className="w-32 h-32 object-cover rounded-full shadow"
                  />
                ))}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No testimonials found.</p>
        )}
      </div>
    </div>
  );
}
