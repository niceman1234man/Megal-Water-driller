import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Your message has been sent!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-white text-blue-900">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="text-4xl font-bold mb-6 text-blue-800">Contact Us</h2>
          <p className="text-lg text-gray-700 mb-6">
            We'd love to hear from you. Whether you have a question about services,
            projects, or anything else — our team is ready to help.
          </p>
          <ul className="space-y-4 text-gray-800 text-base">
            <li>📍 <strong>Address:</strong> Dirar Mall, Office 825/403, Yeka Subcity, Addis Ababa</li>
            <li>📞 <strong>Phone:</strong> +251-907171710 / +251-934227962</li>
            <li>📧 <strong>Email:</strong> muauzamare79@gmail.com</li>
            <li>🌐 <strong>Website:</strong> www.megaldrilling.com</li>
          </ul>

          <iframe
            src="https://maps.google.com/maps?q=addis%20ababa&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="mt-8 w-full h-64 rounded-lg border shadow-md"
            allowFullScreen
            loading="lazy"
            title="Google Map"
          />
        </div>

        {/* Right: Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8 space-y-6 border border-blue-100"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
