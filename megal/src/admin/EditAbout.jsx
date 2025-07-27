import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EditAbout() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch current about text on load
  useEffect(() => {
    axios.get("/api/about")
      .then(res => setText(res.data.text))
      .catch(() => alert("Failed to load current content"))
      .finally(() => setLoading(false));
  }, []);

  // Save edited content
  const handleSave = async () => {
    try {
      await axios.put("/api/about", { text }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
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
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-60 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company profile text..."
            ></textarea>
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
