import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance";

export default function EditAbout() {
  const [about, setAbout] = useState({
    overview: "",
    mission: "",
    vision: "",
    goals: "",
    licenses: [],
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Load current about info
  useEffect(() => {
    axiosInstance
      .get("/api/about")
      .then((res) => setAbout(res.data))
      .catch(() => toast.error("Failed to load About content"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setAbout({ ...about, [e.target.name]: e.target.value });
  };

  // Upload PDF to backend
  const handlePDFUpload = async () => {
    if (!pdfFile) return null;

    const formData = new FormData();
    formData.append("file", pdfFile);

    try {
      const res = await axiosInstance.post("/api/about/license", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("License uploaded!");
      return res.data;
    } catch {
      toast.error("Failed to upload license PDF");
      return null;
    }
  };

  // Save About (overview, mission, vision, goals)
  const handleSave = async () => {
    try {
      const res = await axiosInstance.put(
        "/api/about",
        {
          overview: about.overview,
          mission: about.mission,
          vision: about.vision,
          goals: about.goals,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAbout(res.data);
      toast.success("About section updated successfully!");
    } catch {
      toast.error("Failed to update About content.");
    }
  };

  // Delete license
  const handleDeleteLicense = async (licenseId) => {
    if (!window.confirm("Delete this license?")) return;

    try {
      await axiosInstance.delete(`/api/about/license/${licenseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAbout({
        ...about,
        licenses: about.licenses.filter((l) => l._id !== licenseId),
      });
      toast.success("License deleted!");
    } catch {
      toast.error("Failed to delete license.");
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
            {["overview", "mission", "vision", "goals"].map((field) => (
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

            {/* License Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload New License (PDF)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setPdfFile(e.target.files[0])}
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-white file:bg-blue-600 hover:file:bg-blue-700"
              />
              <button
                onClick={handlePDFUpload}
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Upload License
              </button>
            </div>

            {/* Existing Licenses */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-blue-700 mb-2">
                Existing Licenses
              </h2>
              {about.licenses && about.licenses.length > 0 ? (
                <ul className="space-y-2">
                  {about.licenses.map((license) => (
                    <li
                      key={license._id}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded shadow-sm"
                    >
                      <a
                        href={license.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        {license.filename || "View License"}
                      </a>
                      <button
                        onClick={() => handleDeleteLicense(license._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No licenses uploaded yet.</p>
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
