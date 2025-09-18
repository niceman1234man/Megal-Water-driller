import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [contact, setContact] = useState({});

  useEffect(() => {
    axiosInstance
      .get("/api/contact")
      .then((res) => setContact(res.data))
      .catch(() => setContact({}));
  }, []);

 
  const validateForm = () => {
    const { name, email, subject, message } = formData;

    if (!name.trim() || name.length < 3) {
      toast.error("Name must be at least 3 characters long");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!subject.trim() || subject.length < 5) {
      toast.error("Subject must be at least 5 characters long");
      return false;
    }

    if (!message.trim() || message.length < 10) {
      toast.error("Message must be at least 10 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axiosInstance.post("/api/messages", formData); 
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <section className="py-20 px-6 from-blue-50 to-white text-blue-900">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* Left Contact Info */}
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-blue-800 text-center">
            Contact Us
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            We'd love to hear from you. Whether you have a question about
            services, projects, or anything else — our team is ready to help.
          </p>
          <div className="bg-blue-600 bg-opacity-90 text-white text-xs md:text-sm px-4 py-6 space-y-2 rounded">
            {contact?.phones?.length > 0 && <p>📞 {contact.phones.join(" / ")}</p>}
            {contact?.emails?.length > 0 && <p>📧 {contact.emails.join(" / ")}</p>}
            {contact?.address && <p>🏠 {contact.address}</p>}
          </div>
          <iframe
            src="https://maps.google.com/maps?q=addis%20ababa&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="mt-8 w-full h-64 rounded-lg border shadow-md"
            allowFullScreen
            loading="lazy"
            title="Google Map"
          />
        </div>

        {/* Right Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8 space-y-6 border-t-5 border-r-3 border-blue-600"
        >
          <h3 className="text-center text-blue-600 text-2xl font-semibold">
            Get In Touch With Us
          </h3>

          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@domain.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Message subject"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              rows="5"
              required
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white font-semibold py-2 rounded hover:bg-blue-800 transition shadow"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
