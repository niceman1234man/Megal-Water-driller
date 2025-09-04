import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import axiosInstance from "../axiosInstance";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
  FaTelegram,
} from "react-icons/fa";

export default function ContactSettings() {
  const [info, setInfo] = useState({
    phones: [""],
    emails: [""],
    address: "",
    mapLink: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [platform, setPlatform] = useState("");
  const [link, setLink] = useState("");
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const token = localStorage.getItem("token");

  const platforms = [
    "Facebook",
    "Instagram",
    "Twitter",
    "LinkedIn",
    "YouTube",
    "TikTok",
    "Whatsapp",
    "Telegram",
  ];

  const socialIcons = {
    Facebook: <FaFacebook className="text-blue-600" />,
    Instagram: <FaInstagram className="text-pink-500" />,
    Twitter: <FaTwitter className="text-sky-500" />,
    LinkedIn: <FaLinkedin className="text-blue-700" />,
    YouTube: <FaYoutube className="text-red-600" />,
    TikTok: <FaTiktok className="text-black" />,
    Whatsapp: <FaWhatsapp className="text-green-600" />,
    Telegram: <FaTelegram className="text-sky-600" />,
  };

  useEffect(() => {
    axiosInstance
      .get("/api/socialmedia")
      .then((res) => setSocialLinks(res.data))
      .catch(() => setSocialLinks([]));
  }, []);

  useEffect(() => {
    axiosInstance.get("/api/contact").then((res) => {
      if (res.data) {
        setInfo({
          phones: res.data.phones || [""],
          emails: res.data.emails || [""],
          address: res.data.address || "",
          mapLink: res.data.mapLink || "",
        });
      }
      setLoading(false);
    });
  }, []);

  // Ethiopian phone formatter (auto-format as user types)
const autoFormatEthiopianPhone = (value) => {
  let cleaned = value.trim();

  // If starts with 09 and has 9 digits -> convert to +2519xxxxxxx
  if (/^09\d{8}$/.test(cleaned)) {
    return "+251" + cleaned.substring(1);
  }

  // If already valid Ethiopian format
  if (/^\+2519\d{8}$/.test(cleaned)) {
    return cleaned;
  }

  return cleaned; // return raw input if not matching yet
};

const handleArrayChange = (type, index, value) => {
  const newArray = [...info[type]];

  if (type === "phones") {
    newArray[index] = autoFormatEthiopianPhone(value);
  } else {
    newArray[index] = value;
  }

  setInfo({ ...info, [type]: newArray });
};


  // Validation
// Validation for Contact Info
// Validation for Contact Info
const validateContact = () => {
  const errs = {};

  info.phones.forEach((p, i) => {
    if (p && !/^09\d{8}$/.test(p) && !/^\+2519\d{8}$/.test(p)) {
      errs[`phone-${i}`] =
        "Phone must be Ethiopian format: 09XXXXXXXX or +2519XXXXXXXX";
    }
  });

  info.emails.forEach((e, i) => {
    if (e && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
      errs[`email-${i}`] = "Invalid email format";
    }
  });

  setErrors(errs);
  return Object.keys(errs).length === 0;
};

const validateSocial = () => {
  const errs = {};
  if (!platform) errs.platform = "Select a platform";
  if (!link || !/^https?:\/\/.+/.test(link)) {
    errs.link = "Invalid URL";
  }
  setErrors(errs);
  return Object.keys(errs).length === 0;
};
  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateContact()) return;

    const formattedPhones = info.phones.map((p) => formatEthiopianPhone(p));

    try {
      await axiosInstance.put(
        "/api/contact",
        { ...info, phones: formattedPhones },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Contact info updated!");
    } catch {
      alert("Failed to save contact info.");
    }
  };


  const addField = (type) => {
    setInfo({ ...info, [type]: [...info[type], ""] });
  };

  const removeField = (type, index) => {
    const newArray = [...info[type]];
    newArray.splice(index, 1);
    setInfo({ ...info, [type]: newArray.length ? newArray : [""] });
  };

 const addSocialLink = async () => {
  if (!validateSocial()) return;

  try {
    const res = await axiosInstance.post(
      "/api/socialmedia",
      { platform, link },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSocialLinks([...socialLinks, res.data]);
    setPlatform("");
    setLink("");
  } catch {
    alert("Failed to save social media link.");
  }
};

  const startEdit = (item) => {
    setPlatform(item.platform);
    setLink(item.link);
    setEditingId(item._id);
  };

  const updateSocialLink = async () => {
  if (!validateSocial()) return;

  try {
    const res = await axiosInstance.put(
      `/api/socialmedia/${editingId}`,
      { platform, link },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSocialLinks(
      socialLinks.map((item) => (item._id === editingId ? res.data : item))
    );
    setPlatform("");
    setLink("");
    setEditingId(null);
  } catch {
    alert("Failed to update social media link.");
  }
};

  const removeSocialLink = async (id) => {
    if (!window.confirm("Delete this link?")) return;
    try {
      await axiosInstance.delete(`/api/socialmedia/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSocialLinks(socialLinks.filter((item) => item._id !== id));
    } catch {
      alert("Failed to delete.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">
          Edit Contact Info
        </h1>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          <div className="space-y-6">
            {/* Phones */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Phone Numbers
              </label>
              {info.phones.map((phone, idx) => (
                <div key={idx} className="mb-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) =>
                        handleArrayChange("phones", idx, e.target.value)
                      }
                      className={`flex-1 border p-2 rounded ${
                        errors[`phone-${idx}`] ? "border-red-500" : ""
                      }`}
                      placeholder="09XXXXXXXX or +2519XXXXXXXX"
                    />
                    <button
                      onClick={() => removeField("phones", idx)}
                      className="text-red-600"
                    >
                      ✕
                    </button>
                  </div>
                  {errors[`phone-${idx}`] && (
                    <p className="text-red-500 text-sm">
                      {errors[`phone-${idx}`]}
                    </p>
                  )}
                </div>
              ))}
              <button
                onClick={() => addField("phones")}
                className="text-sm text-blue-600 mt-1"
              >
                + Add Phone
              </button>
            </div>

            {/* Emails */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Emails
              </label>
              {info.emails.map((email, idx) => (
                <div key={idx} className="mb-2">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        handleArrayChange("emails", idx, e.target.value)
                      }
                      className={`flex-1 border p-2 rounded ${
                        errors[`email-${idx}`] ? "border-red-500" : ""
                      }`}
                      placeholder={`Email ${idx + 1}`}
                    />
                    <button
                      onClick={() => removeField("emails", idx)}
                      className="text-red-600"
                    >
                      ✕
                    </button>
                  </div>
                  {errors[`email-${idx}`] && (
                    <p className="text-red-500 text-sm">
                      {errors[`email-${idx}`]}
                    </p>
                  )}
                </div>
              ))}
              <button
                onClick={() => addField("emails")}
                className="text-sm text-blue-600 mt-1"
              >
                + Add Email
              </button>
            </div>

            {/* Address */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Office Address
              </label>
              <input
                type="text"
                value={info.address}
                onChange={(e) => setInfo({ ...info, address: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Google Map */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Google Map Embed Link
              </label>
              <input
                type="text"
                value={info.mapLink}
                onChange={(e) => setInfo({ ...info, mapLink: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Save */}
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Social Media */}
      <section className="bg-white p-4 rounded shadow mt-8">
        <h3 className="text-xl font-bold mb-4">Manage Social Media</h3>

        {/* Form */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="border p-2 rounded w-full md:w-1/3"
          >
            <option value="">Select Platform</option>
            {platforms.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <input
            type="url"
            placeholder="Enter Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className={`border p-2 rounded flex-1 ${
              errors.link ? "border-red-500" : ""
            }`}
          />
          {errors.link && <p className="text-red-500 text-sm">{errors.link}</p>}

          <button
            onClick={editingId ? updateSocialLink : addSocialLink}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingId ? "Update" : "Add"}
          </button>
        </div>

        {/* List */}
        {socialLinks.length > 0 ? (
          <ul className="space-y-2">
            {socialLinks.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span className="flex items-center gap-2">
                  {socialIcons[item.platform] || <span>🌐</span>}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {item.link}
                  </a>
                </span>
                <div className="flex gap-3">
                  <button
                    onClick={() => startEdit(item)}
                    className="text-green-600 hover:text-green-800"
                    aria-label="Edit"
                  >
                    <FiEdit size={18} />
                  </button>

                  <button
                    onClick={() => removeSocialLink(item._id)}
                    className="text-red-600 hover:text-red-800"
                    aria-label="Delete"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No social media links added yet.</p>
        )}
      </section>
    </div>
  );
}
