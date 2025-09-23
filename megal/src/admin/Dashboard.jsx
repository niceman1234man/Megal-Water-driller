import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear auth token
    navigate("/admin/login"); // redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AdminCard title="Edit About Us" path="/admin/edit-about" />
          <AdminCard title="Manage Services" path="/admin/services" />
          <AdminCard title="Manage Projects" path="/admin/projects" />
          <AdminCard title="Manage Gallery" path="/admin/gallery" />
          <AdminCard title="Manage Testimonials" path="/admin/testimonials" />
          <AdminCard title="Edit Contact Info" path="/admin/contact" />
          <AdminCard title="View Messages" path="/admin/messages" />
        </div>

        {/* Bottom section */}
        <div className="mt-8 flex justify-between items-center">
          <Link
            to="/admin/change-password"
            className="text-sm text-blue-500 hover:underline"
          >
            Change Admin Password
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminCard({ title, path }) {
  return (
    <Link
      to={path}
      className="block bg-blue-600 hover:bg-blue-700 text-white text-center py-4 px-6 rounded transition font-medium shadow"
    >
      {title}
    </Link>
  );
}
