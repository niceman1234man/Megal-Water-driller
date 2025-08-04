import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ContactSettings() {
  const [info, setInfo] = useState({
    phones: [""],
    emails: [""],
    address: "",
    mapLink: ""
  });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("/api/contact").then((res) => {
      if (res.data) {
        setInfo({
          phones: res.data.phones || [""],
          emails: res.data.emails || [""],
          address: res.data.address || "",
          mapLink: res.data.mapLink || ""
        });
      }
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

  const handleArrayChange = (type, index, value) => {
    const newArray = [...info[type]];
    newArray[index] = value;
    setInfo({ ...info, [type]: newArray });
  };

  const addField = (type) => {
    setInfo({ ...info, [type]: [...info[type], ""] });
  };

  const removeField = (type, index) => {
    const newArray = [...info[type]];
    newArray.splice(index, 1);
    setInfo({ ...info, [type]: newArray.length ? newArray : [""] });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Edit Contact Info</h1>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          <div className="space-y-6">
            {/* Phone Inputs */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Phone Numbers</label>
              {info.phones.map((phone, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => handleArrayChange("phones", idx, e.target.value)}
                    className="flex-1 border p-2 rounded"
                    placeholder={`Phone ${idx + 1}`}
                  />
                  <button onClick={() => removeField("phones", idx)} className="text-red-600">
                    ✕
                  </button>
                </div>
              ))}
              <button onClick={() => addField("phones")} className="text-sm text-blue-600 mt-1">
                + Add Phone
              </button>
            </div>

            {/* Email Inputs */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Emails</label>
              {info.emails.map((email, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleArrayChange("emails", idx, e.target.value)}
                    className="flex-1 border p-2 rounded"
                    placeholder={`Email ${idx + 1}`}
                  />
                  <button onClick={() => removeField("emails", idx)} className="text-red-600">
                    ✕
                  </button>
                </div>
              ))}
              <button onClick={() => addField("emails")} className="text-sm text-blue-600 mt-1">
                + Add Email
              </button>
            </div>

            {/* Address */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Office Address</label>
              <input
                type="text"
                value={info.address}
                onChange={(e) => setInfo({ ...info, address: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Google Map Link */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Google Map Embed Link</label>
              <input
                type="text"
                value={info.mapLink}
                onChange={(e) => setInfo({ ...info, mapLink: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
