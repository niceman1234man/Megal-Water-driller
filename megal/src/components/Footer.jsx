import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaTelegram,
  FaTiktok,
} from "react-icons/fa";
export default function Footer() {
  const [contact, setContact] = useState({});
  const [socialLinks, setSocialLinks] = useState([]);

  const platformIcons = {
    Facebook: <FaFacebook size={30} className="text-blue-600" />,
    Twitter: <FaTwitter size={24} className="text-sky-500" />,
    LinkedIn: <FaLinkedin size={24} className="text-blue-700" />,
    Instagram: <FaInstagram size={24} className="text-pink-500" />,
    YouTube: <FaYoutube size={24} className="text-red-600" />,
    Telegram: <FaTelegram size={30} className="text-sky-600" />,
    Whatsapp: <FaWhatsapp size={24} className="text-green-600" />,
    Tiktok: <FaTiktok size={24} className="text-red-900" />,
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/contact")
      .then((res) => setContact(res.data))
      .catch(() => setContact({}));
    axios
      .get("http://localhost:5000/api/socialmedia")
      .then((res) => setSocialLinks(res.data))
      .catch(() => setSocialLinks([]));
  }, []);
  return (
    <footer className="bg-blue-900 text-white mt-16 pt-10 pb-6 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-3">Megal Water Drilling</h3>
          <p className="text-sm text-gray-300">
            Delivering sustainable water solutions across Ethiopia with modern
            drilling technology and expert teams.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-2">Quick Links</h4>
          <ul className="text-sm space-y-1 text-gray-300">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#gallery">Gallery</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-2">Contact Info</h4>
          <p className="text-sm text-gray-300">
            🏢 Sealte Mihret Square, Dirar Mall, Office No. 825/403
          </p>
          <p className="text-sm text-gray-300">
            📞{" "}
            {contact && contact.phones && contact.phones.length > 0
              ? contact.phones.join(" / ")
              : "No phone numbers available"}
          </p>

          {contact && contact.emails && contact.emails.length > 0 ? (
            <p className="text-sm text-gray-300">
              📧 {contact.emails.join(" / ")}
            </p>
          ) : (
            <p className="text-sm text-gray-300">📧 No emails available</p>
          )}
          <p className="text-sm text-gray-300">
            🏠{" "}
            {contact && contact.address
              ? contact.address
              : "No address available"}
          </p>
          <p className="text-sm text-gray-300">
            🌐{" "}
            <a href={contact.mapLink || "#"} className="hover:underline">
              View on Map
            </a>
          </p>
          <p className="text-sm text-gray-300">
            📅 Working Hours: Mon-Sat, 8:00 AM - 6:00 PM
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-2">Follow Us</h4>
          {socialLinks.length > 0 ? (
            <div className="flex gap-4">
              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  {platformIcons[item.platform] || <span>{item.platform}</span>}
                </a>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No social media links added yet.</p>
          )}
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 mt-10 border-t pt-4">
        &copy; {new Date().getFullYear()} Megal Water Drilling. All rights
        reserved.
      </div>
    </footer>
  );
}
