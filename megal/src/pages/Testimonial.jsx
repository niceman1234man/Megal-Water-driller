import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Use the local worker file from node_modules
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf-worker/pdf.worker.min.js"; // you'll create this next

const Testimonial = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber((prev) => Math.min(prev + 1, numPages));

  return (
    <section className="min-h-screen py-20 bg-blue-50 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-blue-800 mb-8">
          Client Testimonials & Recommendations
        </h1>

        <div className="bg-white shadow rounded p-4">
          <Document
            file="/pdfs/license.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              pageNumber={pageNumber}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </Document>

          <div className="mt-6 flex justify-between items-center text-blue-700 font-medium">
            <button
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              className="bg-blue-200 px-4 py-2 rounded disabled:opacity-50"
            >
              ⬅ Previous
            </button>

            <span>
              Page {pageNumber} of {numPages}
            </span>

            <button
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              className="bg-blue-200 px-4 py-2 rounded disabled:opacity-50"
            >
              Next ➡
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
