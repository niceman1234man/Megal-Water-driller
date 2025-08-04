import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EditAbout() {
  const [about, setAbout] = useState({
    overview: "",
    mission: "",
    vision: "",
    goal: "",
    licenseUrl: "",
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Load current about info
  useEffect(() => {
    axios.get("/api/about")
      .then((res) => setAbout(res.data))
      .catch(() => alert("Failed to load About content"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setAbout({ ...about, [e.target.name]: e.target.value });
  };

  const handlePDFUpload = async () => {
    if (!pdfFile) return null;

    const formData = new FormData();
    formData.append("file", pdfFile);

    try {
      const res = await axios.post("/api/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.url; // assuming server returns { url: "..." }
    } catch {
      alert("Failed to upload license PDF");
      return null;
    }
  };

  const handleSave = async () => {
    let uploadedUrl = about.licenseUrl;
    if (pdfFile) {
      const result = await handlePDFUpload();
      if (result) uploadedUrl = result;
    }

    try {
      await axios.put(
        "/api/about",
        { ...about, licenseUrl: uploadedUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("About section updated successfully!");
    } catch {
      alert("Failed to update.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Edit About Us</h1>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          <>
            {["overview", "mission", "vision", "goal"].map((field) => (
              <div key={field} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                  {field}
                </label>
                <textarea
                  name={field}
                  value={about[field]}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                License PDF (optional)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setPdfFile(e.target.files[0])}
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-white file:bg-blue-600 hover:file:bg-blue-700"
              />
              {about.licenseUrl && (
                <p className="text-sm text-blue-600 mt-1">
                  Current License:{" "}
                  <a href={about.licenseUrl} target="_blank" rel="noreferrer" className="underline">
                    View PDF
                  </a>
                </p>
              )}
            </div>

            <button
              onClick={handleSave}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </>
        )}
      </div>
    </div>
  );
}
