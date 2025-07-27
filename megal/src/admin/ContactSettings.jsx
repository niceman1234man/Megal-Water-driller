import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ContactSettings() {
  const [info, setInfo] = useState({
    phone: "",
    email: "",
    address: "",
    mapLink: ""
  });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("/api/contact").then(res => {
      if (res.data) setInfo(res.data);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    try {
      await axios.put("/api/contact", info, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Contact info updated!");
    } catch {
      alert("Failed to save contact info.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Edit Contact Info</h1>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Phone"
              value={info.phone}
              onChange={(e) => setInfo({ ...info, phone: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={info.email}
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Office Address"
              value={info.address}
              onChange={(e) => setInfo({ ...info, address: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Google Map Embed Link"
              value={info.mapLink}
              onChange={(e) => setInfo({ ...info, mapLink: e.target.value })}
              className="w-full border p-2 rounded"
            />

            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
